-- VDNZ Pro Championship staging hub extensions only.
-- Additive: does not alter core driver records, scoring or Pro Development.
CREATE TABLE IF NOT EXISTS portal_social_drafts (
 id TEXT PRIMARY KEY,
 title TEXT NOT NULL,
 body TEXT NOT NULL,
 channels TEXT NOT NULL DEFAULT '',
 status TEXT NOT NULL DEFAULT 'Draft',
 created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_portal_social_drafts_created ON portal_social_drafts(created_at);
CREATE TABLE IF NOT EXISTS portal_crew_links (
 role TEXT PRIMARY KEY NOT NULL CHECK(role IN ('commentary','judge1','judge2','judge3','head','producer','broadcast')),
 url TEXT NOT NULL,
 updated_at TEXT NOT NULL
);
