// In-memory SQLite setup for integration tests
import Database from 'better-sqlite3';

export function createTestDb() {
  const db = new Database(':memory:');
  
  // Create tables
  db.exec(`
    CREATE TABLE orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      selections TEXT NOT NULL,
      total REAL NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE menu_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      category TEXT NOT NULL
    );
  `);
  
  // Seed test data
  const insertMenuItem = db.prepare('INSERT INTO menu_items (name, price, category) VALUES (?, ?, ?)');
  insertMenuItem.run('Forbidden Ramen', 0, 'noodleBase');
  insertMenuItem.run('Tofu', 1.75, 'protein');
  insertMenuItem.run('Miso', 0, 'broth');
  
  return db;
}

export function cleanupTestDb(db) {
  db.close();
}