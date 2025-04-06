// backend/src/db/index.js
const Database = require('better-sqlite3');
const db = new Database('garden.db');

// Create table if it doesn't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS plants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    species TEXT,
    planting_date TEXT NOT NULL,
    emergence_start TEXT,
    emergence_end TEXT,
    location TEXT,
    notes TEXT
  )
`).run();

module.exports = db;