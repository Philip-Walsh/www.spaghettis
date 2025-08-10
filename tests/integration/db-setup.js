// In-memory SQLite setup for integration tests
import Database from 'better-sqlite3';

export function createTestDb() {
  try {
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
    
    // Batch insert test data
    const insertMenuItem = db.prepare('INSERT INTO menu_items (name, price, category) VALUES (?, ?, ?)');
    const insertMany = db.transaction((items) => {
      for (const item of items) insertMenuItem.run(...item);
    });
    
    insertMany([
      ['Forbidden Ramen', 0, 'noodleBase'],
      ['Tofu', 1.75, 'protein'],
      ['Miso', 0, 'broth']
    ]);
    
    return db;
  } catch (error) {
    throw new Error(`Failed to create test database: ${error.message}`);
  }
}

export function cleanupTestDb(db) {
  try {
    if (db) db.close();
  } catch (error) {
    console.warn(`Warning: Failed to close test database: ${error.message}`);
  }
}