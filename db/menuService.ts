import { db } from './index';
import { menuCategories, menuItems } from './schema';
import { eq, and, asc } from 'drizzle-orm';

export interface MenuCategory {
    id: number;
    key: string;
    label: string;
    multi: boolean;
    sortOrder: number;
}

export interface MenuItem {
    id: number;
    categoryId: number;
    name: string;
    price: number;
    icon: string;
    description: string;
    tags: string[];
    defaults: Record<string, any>;
    isActive: boolean;
    sortOrder: number;
}

export interface MenuOption {
    label: string;
    key: string;
    multi: boolean;
    choices: MenuItem[];
}

export interface MenuOptions {
    [key: string]: MenuOption;
}

export class MenuService {
    // Get all menu categories
    static async getCategories(): Promise<MenuCategory[]> {
        try {
            const categories = await db
                .select()
                .from(menuCategories)
                .orderBy(asc(menuCategories.sortOrder));
            return categories;
        } catch (error) {
            console.error('Error fetching menu categories:', error);
            throw error;
        }
    }

    // Get all menu items for a specific category
    static async getItemsByCategory(categoryKey: string): Promise<MenuItem[]> {
        try {
            const items = await db
                .select()
                .from(menuItems)
                .innerJoin(menuCategories, eq(menuItems.categoryId, menuCategories.id))
                .where(
                    and(
                        eq(menuCategories.key, categoryKey),
                        eq(menuItems.isActive, true)
                    )
                )
                .orderBy(asc(menuItems.sortOrder));

            return items.map(item => ({
                ...item.menu_items,
                price: Number(item.menu_items.price),
                tags: item.menu_items.tags as string[],
                defaults: item.menu_items.defaults as Record<string, any>
            }));
        } catch (error) {
            console.error(`Error fetching menu items for category ${categoryKey}:`, error);
            throw error;
        }
    }

    // Get all menu options in the format expected by the application
    static async getMenuOptions(): Promise<MenuOptions> {
        try {
            const categories = await this.getCategories();
            const menuOptions: MenuOptions = {};

            for (const category of categories) {
                const items = await this.getItemsByCategory(category.key);
                menuOptions[category.key] = {
                    label: category.label,
                    key: category.key,
                    multi: category.multi,
                    choices: items
                };
            }

            return menuOptions;
        } catch (error) {
            console.error('Error fetching menu options:', error);
            throw error;
        }
    }

    // Add a new menu category
    static async addCategory(category: Omit<MenuCategory, 'id'>): Promise<MenuCategory> {
        try {
            const [newCategory] = await db
                .insert(menuCategories)
                .values(category)
                .returning();
            return newCategory;
        } catch (error) {
            console.error('Error adding menu category:', error);
            throw error;
        }
    }

    // Add a new menu item
    static async addItem(item: Omit<MenuItem, 'id'>): Promise<MenuItem> {
        try {
            const [newItem] = await db
                .insert(menuItems)
                .values({
                    categoryId: item.categoryId,
                    name: item.name,
                    price: item.price.toString(),
                    icon: item.icon,
                    description: item.description,
                    tags: item.tags,
                    defaults: item.defaults,
                    isActive: item.isActive,
                    sortOrder: item.sortOrder
                })
                .returning();

            return {
                ...newItem,
                price: Number(newItem.price),
                tags: newItem.tags as string[],
                defaults: newItem.defaults as Record<string, any>
            };
        } catch (error) {
            console.error('Error adding menu item:', error);
            throw error;
        }
    }

    // Update a menu item
    static async updateItem(id: number, updates: Partial<Omit<MenuItem, 'id'>>): Promise<MenuItem> {
        try {
            const updateData: any = { ...updates };
            if (updates.price !== undefined) {
                updateData.price = updates.price.toString();
            }
            if (updates.tags !== undefined) {
                updateData.tags = updates.tags;
            }
            if (updates.defaults !== undefined) {
                updateData.defaults = updates.defaults;
            }

            const [updatedItem] = await db
                .update(menuItems)
                .set(updateData)
                .where(eq(menuItems.id, id))
                .returning();

            return {
                ...updatedItem,
                price: Number(updatedItem.price),
                tags: updatedItem.tags as string[],
                defaults: updatedItem.defaults as Record<string, any>
            };
        } catch (error) {
            console.error('Error updating menu item:', error);
            throw error;
        }
    }

    // Delete a menu item (soft delete by setting isActive to false)
    static async deleteItem(id: number): Promise<void> {
        try {
            await db
                .update(menuItems)
                .set({ isActive: false })
                .where(eq(menuItems.id, id));
        } catch (error) {
            console.error('Error deleting menu item:', error);
            throw error;
        }
    }
} 