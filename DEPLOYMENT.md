# Руководство по развёртыванию Ortho Patient App

Данное руководство описывает процесс развёртывания приложения Ortho Patient App с использованием Docker Compose на сервере с Debian 13.

## Системные требования

Для успешного развёртывания приложения необходимо обеспечить следующие минимальные требования к серверу:

| Параметр | Минимум | Рекомендуется |
|----------|---------|---------------|
| CPU | 2 ядра | 4 ядра |
| RAM | 2 GB | 4 GB |
| Диск | 20 GB SSD | 50 GB SSD |
| ОС | Debian 12/13 | Debian 13 |

## Подготовка сервера

### Шаг 1: Обновление системы

После подключения к серверу по SSH необходимо обновить систему до актуального состояния:

```bash
sudo apt update && sudo apt upgrade -y
```

### Шаг 2: Установка Docker

Docker является основой для контейнеризации приложения. Установка выполняется следующим образом:

```bash
# Установка необходимых пакетов
sudo apt install -y ca-certificates curl gnupg lsb-release

# Добавление официального GPG ключа Docker
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Добавление репозитория Docker
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Установка Docker Engine
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Добавление текущего пользователя в группу docker
sudo usermod -aG docker $USER
newgrp docker
```

### Шаг 3: Проверка установки

Убедитесь, что Docker установлен корректно:

```bash
docker --version
docker compose version
```

## Структура развёртывания

Создайте директорию для проекта и необходимые файлы:

```bash
mkdir -p /opt/ortho-patient-app
cd /opt/ortho-patient-app
```

### Файл docker-compose.yml

Создайте файл `docker-compose.yml` со следующим содержимым:

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: ortho-patient-app
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://ortho:${DB_PASSWORD}@db:5432/ortho_patient
      - JWT_SECRET=${JWT_SECRET}
      - VITE_APP_TITLE=Ortho Innovations
    depends_on:
      db:
        condition: service_healthy
    networks:
      - ortho-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  db:
    image: postgres:16-alpine
    container_name: ortho-postgres
    restart: unless-stopped
    environment:
      - POSTGRES_USER=ortho
      - POSTGRES_PASSWORD=${DB_PASSWORD}
      - POSTGRES_DB=ortho_patient
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql:ro
    networks:
      - ortho-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ortho -d ortho_patient"]
      interval: 10s
      timeout: 5s
      retries: 5

  nginx:
    image: nginx:alpine
    container_name: ortho-nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
      - certbot_data:/var/www/certbot:ro
    depends_on:
      - app
    networks:
      - ortho-network

  certbot:
    image: certbot/certbot
    container_name: ortho-certbot
    volumes:
      - ./ssl:/etc/letsencrypt
      - certbot_data:/var/www/certbot
    entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $${!}; done;'"

volumes:
  postgres_data:
  certbot_data:

networks:
  ortho-network:
    driver: bridge
```

### Файл Dockerfile

Создайте файл `Dockerfile`:

```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

# Установка pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Копирование файлов зависимостей
COPY package.json pnpm-lock.yaml ./

# Установка зависимостей
RUN pnpm install --frozen-lockfile

# Копирование исходного кода
COPY . .

# Сборка приложения
RUN pnpm build

# Production образ
FROM node:20-alpine AS runner

WORKDIR /app

# Установка pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Копирование собранного приложения
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

# Установка только production зависимостей
RUN pnpm install --prod --frozen-lockfile

# Создание непривилегированного пользователя
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 ortho
USER ortho

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "dist/server/index.js"]
```

### Файл nginx.conf

Создайте файл `nginx.conf` для проксирования запросов:

```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Логирование
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;
    error_log /var/log/nginx/error.log warn;

    # Оптимизация
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;

    # Gzip сжатие
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript 
               application/rss+xml application/atom+xml image/svg+xml;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

    # Upstream для приложения
    upstream ortho_app {
        server app:3000;
        keepalive 32;
    }

    # HTTP сервер (редирект на HTTPS)
    server {
        listen 80;
        server_name your-domain.com;

        location /.well-known/acme-challenge/ {
            root /var/www/certbot;
        }

        location / {
            return 301 https://$server_name$request_uri;
        }
    }

    # HTTPS сервер
    server {
        listen 443 ssl http2;
        server_name your-domain.com;

        # SSL сертификаты
        ssl_certificate /etc/nginx/ssl/live/your-domain.com/fullchain.pem;
        ssl_certificate_key /etc/nginx/ssl/live/your-domain.com/privkey.pem;

        # SSL настройки
        ssl_session_timeout 1d;
        ssl_session_cache shared:SSL:50m;
        ssl_session_tickets off;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
        ssl_prefer_server_ciphers off;

        # HSTS
        add_header Strict-Transport-Security "max-age=63072000" always;

        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;

        # Проксирование к приложению
        location / {
            proxy_pass http://ortho_app;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }

        # API rate limiting
        location /api/ {
            limit_req zone=api burst=20 nodelay;
            proxy_pass http://ortho_app;
            proxy_http_version 1.1;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

### Файл .env

Создайте файл `.env` с переменными окружения:

```bash
# Database
DB_PASSWORD=your_secure_password_here

# JWT
JWT_SECRET=your_jwt_secret_here_min_32_chars

# App
VITE_APP_TITLE=Ortho Innovations Patient App
```

Для генерации безопасных паролей используйте:

```bash
# Генерация пароля базы данных
openssl rand -base64 32

# Генерация JWT секрета
openssl rand -base64 64
```

## Процесс развёртывания

### Шаг 1: Клонирование репозитория

```bash
cd /opt/ortho-patient-app
git clone https://github.com/ortho-innovations/patient-app.git .
```

### Шаг 2: Настройка переменных окружения

```bash
cp .env.example .env
nano .env
# Заполните все необходимые переменные
```

### Шаг 3: Получение SSL сертификата

Перед первым запуском необходимо получить SSL сертификат:

```bash
# Временный запуск nginx для получения сертификата
docker compose up -d nginx

# Получение сертификата
docker compose run --rm certbot certonly --webroot \
    --webroot-path=/var/www/certbot \
    -d your-domain.com \
    --email admin@your-domain.com \
    --agree-tos \
    --no-eff-email
```

### Шаг 4: Запуск приложения

```bash
# Сборка и запуск всех сервисов
docker compose up -d --build

# Проверка статуса
docker compose ps

# Просмотр логов
docker compose logs -f app
```

### Шаг 5: Применение миграций базы данных

```bash
docker compose exec app pnpm db:push
```

## Управление приложением

### Основные команды

| Команда | Описание |
|---------|----------|
| `docker compose up -d` | Запуск всех сервисов |
| `docker compose down` | Остановка всех сервисов |
| `docker compose restart app` | Перезапуск приложения |
| `docker compose logs -f` | Просмотр логов в реальном времени |
| `docker compose ps` | Статус сервисов |

### Обновление приложения

```bash
cd /opt/ortho-patient-app

# Получение обновлений
git pull origin main

# Пересборка и перезапуск
docker compose up -d --build app

# Применение миграций (если есть)
docker compose exec app pnpm db:push
```

### Резервное копирование базы данных

```bash
# Создание бэкапа
docker compose exec db pg_dump -U ortho ortho_patient > backup_$(date +%Y%m%d_%H%M%S).sql

# Восстановление из бэкапа
docker compose exec -T db psql -U ortho ortho_patient < backup_file.sql
```

## Мониторинг

### Проверка здоровья сервисов

```bash
# Статус всех контейнеров
docker compose ps

# Использование ресурсов
docker stats

# Проверка логов на ошибки
docker compose logs --tail=100 app | grep -i error
```

### Настройка автоматического перезапуска

Docker Compose с параметром `restart: unless-stopped` автоматически перезапускает контейнеры после перезагрузки сервера. Для автозапуска Docker при старте системы:

```bash
sudo systemctl enable docker
```

## Устранение неполадок

### Приложение не запускается

Проверьте логи приложения:

```bash
docker compose logs app
```

Убедитесь, что база данных доступна:

```bash
docker compose exec db pg_isready -U ortho
```

### Ошибки подключения к базе данных

Проверьте переменную `DATABASE_URL` и убедитесь, что сервис `db` запущен:

```bash
docker compose ps db
docker compose logs db
```

### SSL сертификат не работает

Проверьте наличие сертификатов:

```bash
ls -la ./ssl/live/your-domain.com/
```

Обновите сертификат вручную:

```bash
docker compose run --rm certbot renew
docker compose restart nginx
```

## Безопасность

Рекомендации по обеспечению безопасности развёртывания:

1. **Файрвол**: Откройте только порты 80 и 443
2. **SSH**: Используйте ключи вместо паролей
3. **Обновления**: Регулярно обновляйте систему и Docker образы
4. **Секреты**: Храните `.env` файл в безопасном месте
5. **Бэкапы**: Настройте автоматическое резервное копирование базы данных

```bash
# Настройка файрвола
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

## Поддержка

При возникновении проблем обращайтесь:
- Email: support@orthoinnovations.ae
- GitHub Issues: https://github.com/ortho-innovations/patient-app/issues
