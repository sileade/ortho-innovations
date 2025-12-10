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

## Calendar Auto-Sync
- [x] ICS calendar feed generation for rehabilitation schedule
- [x] Calendar subscription URL endpoint (webcal://)
- [x] Google Calendar subscription integration
- [x] Apple Calendar subscription integration
- [x] Auto-update when schedule changes (hourly refresh)
- [x] UI for subscribing to calendar (Settings page)

## Push Notifications & Reminders
- [x] Push notification service setup
- [x] Reminder system: 60 days before event
- [x] Reminder system: 30 days before event
- [x] Reminder system: 7 days before event
- [x] Reminder system: 1 day before event
- [x] Integration with calendar auto-add (Google, Apple) - reminders in ICS feed
- [x] Notification preferences UI in Settings

## Bug Fixes
- [x] Fix profile button in header (added to mobile header with ProfileSummary popup)

## Color Scheme Update
- [x] Change from violet/purple to blue-orange tones (matching orthoinnovations.ae)
- [x] Primary: Blue (HSL 200 100% 50%)
- [x] Accent: Coral Orange (HSL 16 100% 60%)
- [x] Update sidebar, buttons, and UI elements

## Automatic Calendar Sync
- [x] Auto-sync calendar when doctor changes schedule
- [x] Webhook/trigger system for schedule updates (admin routes)
- [x] Real-time calendar feed updates (ICS feed auto-refresh)
- [x] Notification to patient when schedule changes

## GitHub & Code Review
- [x] Initialize git repository
- [x] Commit all changes to GitHub (https://github.com/sileade/ortho-patient-app)
- [x] Run TypeScript strict checks (no errors)
- [x] Review code for optimization (clean, no TODOs/FIXMEs)
- [x] Fix identified issues (removed 1 console.log)

## Project Merge
- [x] Analyze ortho-innovations project structure
- [x] Copy patient app into ortho-innovations/frontend/patient-app
- [x] Update combined README.md with screenshots
- [x] Commit and push to GitHub (https://github.com/sileade/ortho-innovations)
