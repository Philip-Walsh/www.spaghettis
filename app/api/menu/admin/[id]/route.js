import { NextResponse } from 'next/server';
import { MenuService } from '../../../../../db/menuService';

// PUT - Update a menu item
export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const body = await request.json();

        const updatedItem = await MenuService.updateItem(parseInt(id), body);

        return NextResponse.json(updatedItem);
    } catch (error) {
        console.error('Error updating menu item:', error);
        return NextResponse.json(
            { error: 'Failed to update menu item' },
            { status: 500 }
        );
    }
}

// DELETE - Soft delete a menu item
export async function DELETE(request, { params }) {
    try {
        const { id } = params;

        await MenuService.deleteItem(parseInt(id));

        return NextResponse.json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        console.error('Error deleting menu item:', error);
        return NextResponse.json(
            { error: 'Failed to delete menu item' },
            { status: 500 }
        );
    }
} 