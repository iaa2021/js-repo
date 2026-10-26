import Database from "better-sqlite3";
const db = new Database('./chat.sqlite');
//improve reliability and protect database consistency
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');
//store user accounts
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL COLLATE NOCASE UNIQUE,
    password_hash TEXT NOT NULL, 
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP );

    CREATE TABLE IF NOT EXISTS sessions (
        token_hash TEXT PRIMARY KEY,
        user_id INTEGER NOT NULL,
        expires_at INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE );
    `);
    export default db;