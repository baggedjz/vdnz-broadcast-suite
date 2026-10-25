-- VDNZ Pro Championship Driver Portal staging only
-- Additive migration: no existing Pro Development or official workbook tables are touched.
CREATE TABLE IF NOT EXISTS portal_users (
 id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE, name TEXT NOT NULL,
 password_salt TEXT NOT NULL, password_hash TEXT NOT NULL,
 status TEXT NOT NULL DEFAULT 'Pending' CHECK(status IN ('Pending','Approved','Suspended')),
 created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS portal_sessions (
 token_hash TEXT PRIMARY KEY, user_id TEXT NOT NULL, expires_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS portal_profiles (
 user_id TEXT PRIMARY KEY, profile_json TEXT NOT NULL DEFAULT '{}',
 updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS portal_rounds (
 round INTEGER PRIMARY KEY, season TEXT NOT NULL DEFAULT '2026',
 track_name TEXT NOT NULL DEFAULT '', briefing_at TEXT NOT NULL DEFAULT '',
 briefing_overview TEXT NOT NULL DEFAULT '', line_map_url TEXT NOT NULL DEFAULT '',
 server_url TEXT NOT NULL DEFAULT '', server_password TEXT NOT NULL DEFAULT '',
 status TEXT NOT NULL DEFAULT 'Upcoming', updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS portal_attendance (
 round INTEGER NOT NULL, user_id TEXT NOT NULL,
 status TEXT NOT NULL DEFAULT 'Pending' CHECK(status IN ('Pending','Here','Not Here')),
 updated_at TEXT NOT NULL, PRIMARY KEY (round,user_id)
);
CREATE TABLE IF NOT EXISTS portal_messages (
 id TEXT PRIMARY KEY, user_id TEXT NOT NULL,
 kind TEXT NOT NULL CHECK(kind IN ('briefing','judges','protest','support','interview')),
 subject TEXT NOT NULL, message TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'New',
 answer TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL, updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS portal_notifications (
 id TEXT PRIMARY KEY, user_id TEXT NOT NULL, title TEXT NOT NULL,
 message TEXT NOT NULL, created_at TEXT NOT NULL, read_at TEXT
);
CREATE TABLE IF NOT EXISTS portal_invites (
 id TEXT PRIMARY KEY, user_id TEXT NOT NULL, message TEXT NOT NULL,
 status TEXT NOT NULL DEFAULT 'Pending', created_at TEXT NOT NULL,
 updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS portal_points (
 user_id TEXT PRIMARY KEY, points INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS portal_groups (
 round INTEGER NOT NULL, user_id TEXT NOT NULL,
 group_number INTEGER NOT NULL CHECK(group_number BETWEEN 1 AND 4),
 slot INTEGER NOT NULL CHECK(slot BETWEEN 1 AND 20),
 PRIMARY KEY (round,user_id), UNIQUE(round,group_number,slot)
);
CREATE INDEX IF NOT EXISTS idx_portal_messages_user ON portal_messages(user_id,created_at);
CREATE INDEX IF NOT EXISTS idx_portal_notifications_user ON portal_notifications(user_id,created_at);
CREATE INDEX IF NOT EXISTS idx_portal_assets_current ON portal_assets(series,season,active,round,kind);
