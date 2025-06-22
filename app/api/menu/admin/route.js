import { NextResponse } from 'next/server';
import { MenuService } from '../../../../db/menuService';

// GET - Get all categories and items for admin
export async function GET() {
    try {
        const categories = await MenuService.getCategories();
        const menuOptions = await MenuService.getMenuOptions();

        return NextResponse.json({
            categories,
            menuOptions
        });
    } catch (error) {
        console.error('Error fetching admin menu data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch admin menu data' },
            { status: 500 }
        );
    }
}

// POST - Add a new menu item
export async function POST(request) {
    try {
        const body = await request.json();
        const newItem = await MenuService.addItem(body);

        return NextResponse.json(newItem, { status: 201 });
    } catch (error) {
        console.error('Error adding menu item:', error);
        return NextResponse.json(
            { error: 'Failed to add menu item' },
            { status: 500 }
        );
    }
} 