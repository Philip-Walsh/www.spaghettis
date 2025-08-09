import { createTestDb, cleanupTestDb } from './db-setup';

describe('Menu API Integration', () => {
  let db;

  beforeEach(() => {
    db = createTestDb();
  });

  afterEach(() => {
    cleanupTestDb(db);
  });

  describe('Menu Items Retrieval', () => {
    it('retrieves all menu items', () => {
      const items = db.prepare('SELECT * FROM menu_items').all();
      expect(items).toHaveLength(3);
      expect(items[0]).toHaveProperty('name', 'Forbidden Ramen');
    });

    it('filters items by category', () => {
      const proteins = db.prepare('SELECT * FROM menu_items WHERE category = ?').all('protein');
      expect(proteins).toHaveLength(1);
      expect(proteins[0].name).toBe('Tofu');
    });
  });

  describe('Error Scenarios', () => {
    it('handles invalid category gracefully', () => {
      const items = db.prepare('SELECT * FROM menu_items WHERE category = ?').all('invalid');
      expect(items).toHaveLength(0);
    });

    it('handles database connection errors', () => {
      db.close();
      expect(() => {
        db.prepare('SELECT * FROM menu_items').all();
      }).toThrow();
    });
  });
});