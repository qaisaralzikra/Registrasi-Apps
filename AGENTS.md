# AGENTS.md — Apps-Relate-House

Event registration + QR ticketing app. Laravel 13 + Inertia + React + Tailwind CSS + Vite.

## Stack & framework

| Layer | Choice |
|---|---|
| Backend | Laravel 13 (PHP ^8.3) |
| Frontend | React 18 via Inertia 2 |
| Styling | Tailwind CSS 3 + `@tailwindcss/forms` |
| Build | Vite 8 + `laravel-vite-plugin` + `@vitejs/plugin-react` |
| Testing | Pest 4 + Pest Laravel plugin |
| Linting | Laravel Pint, StyleCI (Laravel preset) |

## Critical non-obvious fact

**`App\Models\User` extends `Model`, NOT `Authenticatable`.** There is no `password`, `name`, or `email` column on the `users` table. The users table has `id_events` (FK → events), `status` (enum: `hadir`/`belum hadir`/`tidak hadir`), and timestamps. Do not assume standard Laravel authentication or user schema.

## Domain model

- **Event** → hasMany User (via `id_events`), hasMany Registrasi, hasMany QrCode
- **User** (attendee) → belongsTo Event, hasOne Registrasi, hasOne QrCode
- **Registrasi** (form submission) → belongsTo User, belongsTo Event. Stores dynamic form answers in `custom_field_values` JSON column.
- **QrCode** (entry ticket) → belongsTo User, belongsTo Event. Has unique `qr_token` and `is_used` boolean.

## Routes

- `routes/web.php` — welcome, dashboard (auth+verified), profile CRUD
- `routes/auth.php` — login, register, password reset, email verification, logout
- `routes/console.php` — artisan commands (inspire)

## Key commands

```sh
# Full project setup (first time)
composer run setup

# Dev servers (PHP serve + queue + logs + Vite, all in parallel)
composer run dev

# Run tests (config:clear then pest via artisan)
composer run test

# Run a single test file
php artisan test tests/Feature/SomeTest.php

# Run a single test method
php artisan test --filter="test name"

# Lint check
./vendor/bin/pint --test

# Lint + auto-fix
./vendor/bin/pint
```

## Test conventions

- Pest syntax (not PHPUnit classes). See `tests/Feature/ExampleTest.php` for patterns.
- All feature tests use `RefreshDatabase` (auto-applied via `tests/Pest.php`).
- Test DB: SQLite `:memory:` (configured in `phpunit.xml`).
- Factory: `User` factory exists at `database/factories/UserFactory.php`.
- Group: Unit tests in `tests/Unit/`, feature tests in `tests/Feature/`.

## Frontend conventions

- Inertia pages live in `resources/js/Pages/`, resolved by component name.
- Shared components in `resources/js/Components/`.
- Layouts in `resources/js/Layouts/` (`AuthenticatedLayout`, `GuestLayout`).
- Entry point: `resources/js/app.jsx`. Root Blade view: `resources/views/app.blade.php`.
- Ziggy (`tightenco/ziggy`) available for named route helpers in JS.
- `.npmrc` sets `ignore-scripts=true`; run `npm run build` explicitly after `npm install`.

## Environment

- Dev DB: MySQL (`registrasi_db` in `.env`). Test DB: SQLite in-memory (`.env.example` default).
- `.env` is gitignored; copy `.env.example` → `.env` and configure.
- Vite dev server proxies Laravel requests; `APP_URL` must match.

## CI

- Tests run on PHP 8.3, 8.4, 8.5 via GitHub Actions (`.github/workflows/tests.yml`).
- Steps: `composer install` → `cp .env.example .env` → `php artisan key:generate` → `php artisan test`.
