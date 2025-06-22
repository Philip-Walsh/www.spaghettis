import { integer, pgTable, varchar, text, decimal, boolean, jsonb } from 'drizzle-orm/pg-core';

export const posts = pgTable('posts', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: varchar({ length: 255 }).notNull(),
    content: text().notNull().default('')
});

// Menu categories table
export const menuCategories = pgTable('menu_categories', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    key: varchar({ length: 50 }).notNull().unique(), // e.g., 'noodleBase', 'protein'
    label: varchar({ length: 100 }).notNull(), // e.g., 'Choose Your Noodle Base'
    multi: boolean().notNull().default(false), // whether multiple selections are allowed
    sortOrder: integer().notNull().default(0)
});

// Menu items table
export const menuItems = pgTable('menu_items', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    categoryId: integer().notNull().references(() => menuCategories.id),
    name: varchar({ length: 100 }).notNull(),
    price: decimal({ precision: 10, scale: 2 }).notNull().default('0.00'),
    icon: varchar({ length: 20 }).notNull().default('🍜'),
    description: text().notNull(),
    tags: jsonb().notNull().default('[]'), // array of tags like ['vegetarian', 'vegan']
    defaults: jsonb().notNull().default('{}'), // JSON object for default selections
    isActive: boolean().notNull().default(true),
    sortOrder: integer().notNull().default(0)
});