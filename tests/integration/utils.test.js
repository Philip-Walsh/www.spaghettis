import { getMenuOptions, getStepOptions } from '../../utils/getMenuItems';

// Mock fetch globally
global.fetch = jest.fn();

describe('Menu Utils Integration Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getMenuOptions', () => {
        it('should fetch menu options from API successfully', async () => {
            const mockMenuData = {
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

            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockMenuData
            });

            const result = await getMenuOptions();

            expect(result).toEqual(mockMenuData);
            expect(global.fetch).toHaveBeenCalledWith('/api/menu', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        });

        it('should fallback to static data when API fails', async () => {
            global.fetch.mockRejectedValueOnce(new Error('Network error'));

            const result = await getMenuOptions();

            // Should return static data from menuOptions.js
            expect(result).toBeDefined();
            expect(result.noodleBase).toBeDefined();
            expect(result.noodleBase.choices).toBeDefined();
            expect(Array.isArray(result.noodleBase.choices)).toBe(true);
        });

        it('should fallback to static data when API returns error status', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                status: 500
            });

            const result = await getMenuOptions();

            // Should return static data from menuOptions.js
            expect(result).toBeDefined();
            expect(result.noodleBase).toBeDefined();
        });

        it('should handle malformed JSON response', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => {
                    throw new Error('Invalid JSON');
                }
            });

            const result = await getMenuOptions();

            // Should return static data from menuOptions.js
            expect(result).toBeDefined();
            expect(result.noodleBase).toBeDefined();
        });
    });

    describe('getStepOptions', () => {
        it('should return step options for valid step key', async () => {
            const mockMenuData = {
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

            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockMenuData
            });

            const result = await getStepOptions('noodleBase');

            expect(result).toEqual(mockMenuData.noodleBase);
            expect(result.label).toBe('Choose Your Noodle Base');
            expect(result.choices).toHaveLength(1);
        });

        it('should throw error for invalid step key', async () => {
            const mockMenuData = {
                noodleBase: {
                    label: 'Choose Your Noodle Base',
                    key: 'noodleBase',
                    multi: false,
                    choices: []
                }
            };

            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockMenuData
            });

            await expect(getStepOptions('invalidStep')).rejects.toThrow('Step invalidStep not found in menu options');
        });

        it('should handle API errors gracefully', async () => {
            global.fetch.mockRejectedValueOnce(new Error('API error'));

            const result = await getStepOptions('noodleBase');

            // Should return step from static data
            expect(result).toBeDefined();
            expect(result.key).toBe('noodleBase');
        });
    });

    describe('Error Handling', () => {
        it('should handle network timeouts', async () => {
            global.fetch.mockRejectedValueOnce(new Error('timeout'));

            const result = await getMenuOptions();

            expect(result).toBeDefined();
            expect(result.noodleBase).toBeDefined();
        });

        it('should handle CORS errors', async () => {
            global.fetch.mockRejectedValueOnce(new Error('CORS error'));

            const result = await getMenuOptions();

            expect(result).toBeDefined();
            expect(result.noodleBase).toBeDefined();
        });

        it('should handle 404 errors', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                status: 404
            });

            const result = await getMenuOptions();

            expect(result).toBeDefined();
            expect(result.noodleBase).toBeDefined();
        });
    });

    describe('Data Structure Validation', () => {
        it('should handle empty API response', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({})
            });

            const result = await getMenuOptions();

            // Should fallback to static data
            expect(result).toBeDefined();
            expect(result.noodleBase).toBeDefined();
        });

        it('should handle API response with missing properties', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    noodleBase: {
                        label: 'Choose Your Noodle Base',
                        // Missing key, multi, choices
                    }
                })
            });

            const result = await getMenuOptions();

            // Should fallback to static data
            expect(result).toBeDefined();
            expect(result.noodleBase).toBeDefined();
            expect(result.noodleBase.choices).toBeDefined();
        });
    });
}); 