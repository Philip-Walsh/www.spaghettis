import { GET, POST } from '../../app/api/menu/route';
import { GET as AdminGET, POST as AdminPOST } from '../../app/api/menu/admin/route';
import { PUT, DELETE } from '../../app/api/menu/admin/[id]/route';
import { MenuService } from '../../db/menuService';

// Mock the database service
jest.mock('../../db/menuService');

// Mock NextRequest
const mockRequest = (method, body = null, url = 'http://localhost:3000/api/menu') => ({
    method,
    url,
    json: async () => body,
    headers: { 'Content-Type': 'application/json' }
});

describe('Menu API Integration Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /api/menu', () => {
        it('should return menu options successfully', async () => {
            const mockMenuOptions = {
                noodleBase: {
                    label: 'Choose Your Noodle Base',
                    key: 'noodleBase',
                    multi: false,
                    choices: [
                        {
                            id: 1,
                            name: 'Forbidden Ramen',
                            price: 0,
                            icon: '🥷🍜',
                            description: 'Firm wheat noodles...',
                            tags: ['vegetarian'],
                            defaults: {},
                            isActive: true,
                            sortOrder: 0
                        }
                    ]
                }
            };

            MenuService.getMenuOptions.mockResolvedValue(mockMenuOptions);

            const response = await GET();
            const data = await response.json();

            expect(response.status).toBe(200);
            expect(data).toEqual(mockMenuOptions);
            expect(MenuService.getMenuOptions).toHaveBeenCalledTimes(1);
        });

        it('should handle database errors gracefully', async () => {
            MenuService.getMenuOptions.mockRejectedValue(new Error('Database connection failed'));

            const response = await GET();
            const data = await response.json();

            expect(response.status).toBe(500);
            expect(data.error).toBe('Failed to fetch menu options');
        });
    });

    describe('GET /api/menu/admin', () => {
        it('should return categories and menu options for admin', async () => {
            const mockCategories = [
                { id: 1, key: 'noodleBase', label: 'Choose Your Noodle Base', multi: false, sortOrder: 0 }
            ];

            const mockMenuOptions = {
                noodleBase: {
                    label: 'Choose Your Noodle Base',
                    key: 'noodleBase',
                    multi: false,
                    choices: []
                }
            };

            MenuService.getCategories.mockResolvedValue(mockCategories);
            MenuService.getMenuOptions.mockResolvedValue(mockMenuOptions);

            const response = await AdminGET();
            const data = await response.json();

            expect(response.status).toBe(200);
            expect(data.categories).toEqual(mockCategories);
            expect(data.menuOptions).toEqual(mockMenuOptions);
        });

        it('should handle admin data fetch errors', async () => {
            MenuService.getCategories.mockRejectedValue(new Error('Admin fetch failed'));

            const response = await AdminGET();
            const data = await response.json();

            expect(response.status).toBe(500);
            expect(data.error).toBe('Failed to fetch admin menu data');
        });
    });

    describe('POST /api/menu/admin', () => {
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

            const createdItem = { id: 1, ...newItem };
            MenuService.addItem.mockResolvedValue(createdItem);

            const request = mockRequest('POST', newItem, 'http://localhost:3000/api/menu/admin');

            const response = await AdminPOST(request);
            const data = await response.json();

            expect(response.status).toBe(201);
            expect(data).toEqual(createdItem);
            expect(MenuService.addItem).toHaveBeenCalledWith(newItem);
        });

        it('should handle item creation errors', async () => {
            MenuService.addItem.mockRejectedValue(new Error('Creation failed'));

            const request = mockRequest('POST', {}, 'http://localhost:3000/api/menu/admin');

            const response = await AdminPOST(request);
            const data = await response.json();

            expect(response.status).toBe(500);
            expect(data.error).toBe('Failed to add menu item');
        });
    });

    describe('PUT /api/menu/admin/[id]', () => {
        it('should update a menu item successfully', async () => {
            const updates = { price: 3.00, description: 'Updated description' };
            const updatedItem = { id: 1, name: 'Test Noodle', price: 3.00, description: 'Updated description' };

            MenuService.updateItem.mockResolvedValue(updatedItem);

            const request = mockRequest('PUT', updates, 'http://localhost:3000/api/menu/admin/1');

            const response = await PUT(request, { params: { id: '1' } });
            const data = await response.json();

            expect(response.status).toBe(200);
            expect(data).toEqual(updatedItem);
            expect(MenuService.updateItem).toHaveBeenCalledWith(1, updates);
        });

        it('should handle update errors', async () => {
            MenuService.updateItem.mockRejectedValue(new Error('Update failed'));

            const request = mockRequest('PUT', {}, 'http://localhost:3000/api/menu/admin/1');

            const response = await PUT(request, { params: { id: '1' } });
            const data = await response.json();

            expect(response.status).toBe(500);
            expect(data.error).toBe('Failed to update menu item');
        });
    });

    describe('DELETE /api/menu/admin/[id]', () => {
        it('should delete a menu item successfully', async () => {
            MenuService.deleteItem.mockResolvedValue();

            const request = mockRequest('DELETE', null, 'http://localhost:3000/api/menu/admin/1');

            const response = await DELETE(request, { params: { id: '1' } });
            const data = await response.json();

            expect(response.status).toBe(200);
            expect(data.message).toBe('Menu item deleted successfully');
            expect(MenuService.deleteItem).toHaveBeenCalledWith(1);
        });

        it('should handle delete errors', async () => {
            MenuService.deleteItem.mockRejectedValue(new Error('Delete failed'));

            const request = mockRequest('DELETE', null, 'http://localhost:3000/api/menu/admin/1');

            const response = await DELETE(request, { params: { id: '1' } });
            const data = await response.json();

            expect(response.status).toBe(500);
            expect(data.error).toBe('Failed to delete menu item');
        });
    });
}); 