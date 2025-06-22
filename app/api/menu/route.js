import { NextResponse } from 'next/server';
import { MenuService } from '../../../db/menuService';

export async function GET() {
    try {
        const menuOptions = await MenuService.getMenuOptions();
        return NextResponse.json(menuOptions);
    } catch (error) {
        console.error('Error fetching menu options:', error);
        return NextResponse.json(
            { error: 'Failed to fetch menu options' },
            { status: 500 }
        );
    }
} 