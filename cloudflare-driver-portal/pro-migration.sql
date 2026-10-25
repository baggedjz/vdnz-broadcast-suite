-- New Pro Championship staging production workbench, isolated D1 tables.
-- This migration does not touch official workbook, Pro Development or live scoring.
CREATE TABLE IF NOT EXISTS portal_pro_state(
 id INTEGER PRIMARY KEY CHECK(id=1),
 round INTEGER NOT NULL DEFAULT 1,
 mode TEXT NOT NULL DEFAULT 'qualifying' CHECK(mode IN ('qualifying','battle')),
 stage TEXT NOT NULL DEFAULT 'Top 32',
 run INTEGER NOT NULL DEFAULT 1 CHECK(run IN (1,2)),
 lead_id TEXT NOT NULL DEFAULT '',
 chase_id TEXT NOT NULL DEFAULT '',
 cue TEXT NOT NULL DEFAULT 'idle',
 version INTEGER NOT NULL DEFAULT 0,
 updated_at TEXT NOT NULL
);
INSERT OR IGNORE INTO portal_pro_state(id,round,mode,stage,run,lead_id,chase_id,cue,version,updated_at)
VALUES(1,1,'qualifying','Top 32',1,'','','idle',0,datetime('now'));
CREATE TABLE IF NOT EXISTS portal_pro_scores (
 round INTEGER NOT NULL, mode TEXT NOT NULL, stage TEXT NOT NULL,
 run INTEGER NOT NULL, lead_id TEXT NOT NULL, chase_id TEXT NOT NULL,
 judge TEXT NOT NULL CHECK(judge IN ('judge1','judge2','judge3','head')),
 line REAL,angle REAL,style REAL,
 vote TEXT NOT NULL DEFAULT '',
 notes TEXT NOT NULL DEFAULT '',
 locked INTEGER NOT NULL DEFAULT 0,
 updated_at TEXT NOT NULL,
 PRIMARY KEY(round,mode,stage,run,lead_id,chase_id,judge)
);
CREATE TABLE IF NOT EXISTS portal_pro_crew_keys(
 role TEXT PRIMARY KEY CHECK(role IN ('commentary','judge1','judge2','judge3','head')),
 token_hash TEXT NOT NULL,
 created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS portal_pro_chat(
 seq INTEGER PRIMARY KEY AUTOINCREMENT,
 role TEXT NOT NULL,
 message TEXT NOT NULL,
 created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS portal_pro_audit(
 id TEXT PRIMARY KEY,
 actor TEXT NOT NULL,
 action TEXT NOT NULL,
 detail TEXT NOT NULL,
 created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS portal_pro_scores_event ON portal_pro_scores(round,mode,stage,lead_id);
CREATE INDEX IF NOT EXISTS portal_pro_audit_time ON portal_pro_audit(created_at);

-- Judge review notes, internal to appointed Pro Championship judging staff.
CREATE TABLE IF NOT EXISTS portal_pro_protest_notes (
 id TEXT PRIMARY KEY,
 message_id TEXT NOT NULL,
 judge_role TEXT NOT NULL CHECK(judge_role IN ('judge1','judge2','judge3','head','staff')),
 note TEXT NOT NULL,
 created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_pro_protest_notes_message ON portal_pro_protest_notes(message_id,created_at);
