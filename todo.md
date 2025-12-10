# Ortho Patient App - TODO

## Design System
- [x] Mobile-first responsive layout
- [x] Desktop sidebar + mobile bottom navigation
- [x] Dark/light theme switcher
- [x] Russian/English language support
- [x] Update color scheme to violet/purple tones (per TZ)
- [x] Update icons to Notion hand-drawn style

## Блок 1: Персональный профиль пациента
- [ ] Patient registration with questionnaire (20-25 questions)
- [ ] QR code generation for patient identification
- [x] Profile view and edit functionality
- [ ] Critical changes require admin verification
- [ ] Profile change log with timestamps

## Блок 2: Персональный план реабилитации
- [x] Team info display (manager, prosthetist, LFK doctor, service center)
- [ ] Direct contact with specialists
- [x] Rehabilitation courses linked to pathology
- [x] Personal 24+ month plan based on prosthesis type
- [x] Dynamic rehabilitation plan (50-70 events)
- [ ] Event creation by LFK doctors

## Блок 3: База знаний
- [x] Knowledge base page with categories
- [x] Search functionality
- [ ] Full-text search with highlighting
- [ ] Filter by categories, tags, prosthesis type, date
- [ ] Smart recommendations based on patient profile
- [ ] Video content for exercises

## Блок 4: Гарантийное и сервисное обслуживание
- [x] Prosthesis card with basic info
- [x] Full prosthesis details (model, serial, warranty indicator)
- [ ] Component list
- [x] Service history
- [x] Service booking form with available slots
- [ ] Emergency repair button with price/ETA

## Блок 5: Монетизация и дополнительные услуги
- [ ] Services catalog with details
- [ ] Reviews and ratings
- [ ] Purchase process flow
- [ ] Payment emulation (prototype stage)
- [ ] Order history with statuses

## Блок 6: Администрирование (веб-панель для врачей)
- [x] Admin dashboard layout
- [ ] Content management (articles CRUD)
- [ ] Media file upload
- [x] Patient list with filters
- [x] Patient profile viewing
- [ ] Account verification/blocking
- [ ] Specialist assignment
- [ ] Rehabilitation plan creation
- [ ] Order management
- [ ] Push notification broadcasts
- [x] Analytics dashboard (MAU/DAU, Retention, conversions)
- [ ] Export to Excel/CSV

## Уведомления и напоминания
- [ ] Push notifications (60, 30, 7, 1 day before events)
- [ ] Event confirmation/reschedule/cancel
- [x] Calendar integration (Google, Apple, Outlook)

## Backend API
- [x] Database schema
- [x] Basic tRPC procedures
- [ ] Patient registration API
- [ ] Profile change logging
- [x] Rehabilitation plan API
- [x] Service booking API
- [ ] Notifications API
- [ ] Admin API endpoints

## Testing
- [x] Testing cycle 1 - Unit tests for database queries (17 tests passing)
- [ ] Testing cycle 2 - Frontend components
- [ ] Testing cycle 3 - API integration
- [ ] Testing cycle 4 - Admin panel
- [ ] Testing cycle 5 - Full E2E

## Documentation
- [x] Update README.md with documentation
- [x] Docker Compose deployment guide for Debian 13
- [ ] API documentation


## UX Improvements (New)
- [x] Dynamic greeting based on time of day (утро/день/вечер/ночь)
- [x] Back button with proper navigation
- [x] Swipe gesture navigation (iPhone-style)
- [x] Profile summary popup on profile button click
