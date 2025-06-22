import { MenuService } from '../../db/menuService';

// Mock the database connection
jest.mock('../../db/index', () => ({
    db: {
        select: jest.fn().mockReturnThis(),
        from: jest.fn().mockReturnThis(),
        innerJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        insert: jest.fn().mockReturnThis(),
        values: jest.fn().mockReturnThis(),
        returning: jest.fn().mockReturnThis(),
        update: jest.fn().mockReturnThis(),
        set: jest.fn().mockReturnThis(),
        eq: jest.fn(),
        and: jest.fn(),
        asc: jest.fn()
    }
}));

describe('MenuService Integration Tests', () => {
    let mockDb;

    beforeEach(() => {
        jest.clearAllMocks();
        mockDb = require('../../db/index').db;
    });

    describe('getCategories', () => {
        it('should fetch categories successfully', async () => {
            const mockCategories = [
                { id: 1, key: 'noodleBase', label: 'Choose Your Noodle Base', multi: false, sortOrder: 0 },
                { id: 2, key: 'protein', label: 'Choose Your Protein', multi: true, sortOrder: 1 }
            ];

            mockDb.returning.mockResolvedValue(mockCategories);

            const result = await MenuService.getCategories();

            expect(result).toEqual(mockCategories);
            expect(mockDb.select).toHaveBeenCalled();
            expect(mockDb.from).toHaveBeenCalled();
            expect(mockDb.orderBy).toHaveBeenCalled();
        });

        it('should handle database errors', async () => {
            mockDb.returning.mockRejectedValue(new Error('Database error'));

            await expect(MenuService.getCategories()).rejects.toThrow('Database error');
        });
    });

    describe('getItemsByCategory', () => {
        it('should fetch items for a specific category', async () => {
            const mockItems = [
                {
                    menu_items: {
                        id: 1,
                        categoryId: 1,
                        name: 'Forbidden Ramen',
                        price: '0.00',
                        icon: '🥷🍜',
                        description: 'Firm wheat noodles...',
                        tags: ['vegetarian'],
                        defaults: {},
                        isActive: true,
                        sortOrder: 0
                    }
                }
            ];

            mockDb.returning.mockResolvedValue(mockItems);

            const result = await MenuService.getItemsByCategory('noodleBase');

            expect(result).toHaveLength(1);
            expect(result[0].name).toBe('Forbidden Ramen');
            expect(result[0].price).toBe(0);
            expect(result[0].tags).toEqual(['vegetarian']);
            expect(mockDb.innerJoin).toHaveBeenCalled();
            expect(mockDb.where).toHaveBeenCalled();
        });

        it('should handle empty results', async () => {
            mockDb.returning.mockResolvedValue([]);

            const result = await MenuService.getItemsByCategory('nonexistent');

            expect(result).toEqual([]);
        });
    });

    describe('getMenuOptions', () => {
        it('should return complete menu options structure', async () => {
            const mockCategories = [
                { id: 1, key: 'noodleBase', label: 'Choose Your Noodle Base', multi: false, sortOrder: 0 }
            ];

            const mockItems = [
                {
                    menu_items: {
                        id: 1,
                        categoryId: 1,
                        name: 'Forbidden Ramen',
                        price: '0.00',
                        icon: '🥷🍜',
                        description: 'Firm wheat noodles...',
                        tags: ['vegetarian'],
                        defaults: {},
                        isActive: true,
                        sortOrder: 0
                    }
                }
            ];

            // Mock the chained calls
            mockDb.returning
                .mockResolvedValueOnce(mockCategories) // getCategories
                .mockResolvedValueOnce(mockItems);     // getItemsByCategory

            const result = await MenuService.getMenuOptions();

            expect(result).toHaveProperty('noodleBase');
            expect(result.noodleBase.label).toBe('Choose Your Noodle Base');
            expect(result.noodleBase.choices).toHaveLength(1);
            expect(result.noodleBase.choices[0].name).toBe('Forbidden Ramen');
        });

        it('should handle errors in category fetching', async () => {
            mockDb.returning.mockRejectedValue(new Error('Category fetch failed'));

            await expect(MenuService.getMenuOptions()).rejects.toThrow('Category fetch failed');
        });
    });

    describe('addCategory', () => {
        it('should create a new category successfully', async () => {
            const newCategory = {
                key: 'testCategory',
                label: 'Test Category',
                multi: false,
                sortOrder: 0
            };

            const createdCategory = { id: 3, ...newCategory };
            mockDb.returning.mockResolvedValue([createdCategory]);

            const result = await MenuService.addCategory(newCategory);

            expect(result).toEqual(createdCategory);
            expect(mockDb.insert).toHaveBeenCalled();
            expect(mockDb.values).toHaveBeenCalledWith(newCategory);
        });
    });

    describe('addItem', () => {
        it('should create a new menu item successfully', async () => {
            const newItem = {
                categoryId: 1,
                name: 'Test Noodle',
                price: 2.50,
                icon: '🍜',
                description: 'A test noodle',
                tags: ['vegetarian'],
                defaults: {},
                isActive: true,
                sortOrder: 0
            };

            const createdItem = {
                id: 1,
                categoryId: 1,
                name: 'Test Noodle',
                price: '2.50',
                icon: '🍜',
                description: 'A test noodle',
                tags: ['vegetarian'],
                defaults: {},
                isActive: true,
                sortOrder: 0
            };

            mockDb.returning.mockResolvedValue([createdItem]);

            const result = await MenuService.addItem(newItem);

            expect(result.id).toBe(1);
            expect(result.name).toBe('Test Noodle');
            expect(result.price).toBe(2.50); // Should be converted back to number
            expect(result.tags).toEqual(['vegetarian']);
            expect(mockDb.insert).toHaveBeenCalled();
            expect(mockDb.values).toHaveBeenCalledWith({
                ...newItem,
                price: '2.50',
                tags: ['vegetarian'],
                defaults: {}
            });
        });
    });

    describe('updateItem', () => {
        it('should update a menu item successfully', async () => {
            const updates = { price: 3.00, description: 'Updated description' };
            const updatedItem = {
                id: 1,
                categoryId: 1,
                name: 'Test Noodle',
                price: '3.00',
                icon: '🍜',
                description: 'Updated description',
                tags: ['vegetarian'],
                defaults: {},
                isActive: true,
                sortOrder: 0
            };

            mockDb.returning.mockResolvedValue([updatedItem]);

            const result = await MenuService.updateItem(1, updates);

            expect(result.price).toBe(3.00); // Should be converted back to number
            expect(result.description).toBe('Updated description');
            expect(mockDb.update).toHaveBeenCalled();
            expect(mockDb.set).toHaveBeenCalledWith({
                price: '3.00',
                description: 'Updated description'
            });
        });

        it('should handle partial updates', async () => {
            const updates = { price: 3.00 };
            const updatedItem = {
                id: 1,
                price: '3.00',
                description: 'Original description'
            };

            mockDb.returning.mockResolvedValue([updatedItem]);

            const result = await MenuService.updateItem(1, updates);

            expect(result.price).toBe(3.00);
            expect(mockDb.set).toHaveBeenCalledWith({
                price: '3.00'
            });
        });
    });

    describe('deleteItem', () => {
        it('should soft delete a menu item', async () => {
            mockDb.returning.mockResolvedValue([]);

            await MenuService.deleteItem(1);

            expect(mockDb.update).toHaveBeenCalled();
            expect(mockDb.set).toHaveBeenCalledWith({ isActive: false });
        });
    });
}); 