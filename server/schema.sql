-- Run once:
-- wrangler d1 execute albion-coach-db --file=server/schema.sql

CREATE TABLE IF NOT EXISTS admin_credentials (
  id            INTEGER PRIMARY KEY DEFAULT 1,
  email         TEXT    NOT NULL DEFAULT 'admin@albioncoach.co.uk',
  password_hash TEXT    NOT NULL  -- bcrypt hash; seed with server/seed.ts
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  name         TEXT    NOT NULL,
  email        TEXT    NOT NULL,
  phone        TEXT,
  journey_date TEXT,
  message      TEXT    NOT NULL,
  created_at   TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS bookings (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  purpose         TEXT    NOT NULL,
  passengers      INTEGER NOT NULL,
  pickup          TEXT    NOT NULL,
  dropoff         TEXT    NOT NULL,
  journey_date    TEXT    NOT NULL,
  journey_time    TEXT    NOT NULL,
  vehicle         TEXT    NOT NULL,
  comfort_tier    TEXT    NOT NULL,
  add_ons         TEXT    NOT NULL DEFAULT '[]',
  estimated_price REAL    NOT NULL,
  name            TEXT    NOT NULL,
  email           TEXT    NOT NULL,
  phone           TEXT,
  status          TEXT    NOT NULL DEFAULT 'pending',
  created_at      TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS fleet (
  id       TEXT PRIMARY KEY,  -- e.g. 'royal-suite'
  img      TEXT NOT NULL,      -- image path
  range    TEXT NOT NULL       -- price range, e.g. 'From £640 / day'
);
