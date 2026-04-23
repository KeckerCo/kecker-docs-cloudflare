CREATE TABLE IF NOT EXISTS contact_submissions (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT    NOT NULL,
  email      TEXT    NOT NULL,
  company    TEXT,
  interest   TEXT,
  message    TEXT    NOT NULL,
  ip         TEXT,
  created_at TEXT    NOT NULL DEFAULT (datetime('now'))
);
