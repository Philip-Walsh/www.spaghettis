# Database Setup for Menu Items

This project uses PostgreSQL with Neon as the database provider and Drizzle ORM for database operations.

## Database Schema

The database includes the following tables:

### `menu_categories`

- `id`: Primary key
- `key`: Unique identifier (e.g., 'noodleBase', 'protein')
- `label`: Display name (e.g., 'Choose Your Noodle Base')
- `multi`: Boolean indicating if multiple selections are allowed
- `sortOrder`: Order for display

### `menu_items`

- `id`: Primary key
- `categoryId`: Foreign key to menu_categories
- `name`: Item name
- `price`: Decimal price
- `icon`: Emoji icon
- `description`: Item description
- `tags`: JSON array of tags (e.g., ['vegetarian', 'vegan'])
- `defaults`: JSON object for default selections
- `isActive`: Boolean for soft delete
- `sortOrder`: Order within category

## Setup Instructions

### 1. Environment Variables

Make sure you have the following environment variables set:

- `DATABASE_URL`: Your Neon PostgreSQL connection string

### 2. Database Migration

Run the following commands to set up the database:

```bash
# Generate migration files
npm run db:generate

# Run migrations
npm run db:migrate

# Seed the database with menu data
npm run db:seed
```

### 3. Database Studio (Optional)

To view and edit data in a web interface:

```bash
npm run db:studio
```

## API Endpoints

### GET /api/menu

Returns all menu options in the format expected by the application.

Response format:

```json
{
  "noodleBase": {
    "label": "Choose Your Noodle Base",
    "key": "noodleBase",
    "multi": false,
    "choices": [
      {
        "id": 1,
        "name": "Forbidden Ramen",
        "price": 0,
        "icon": "🥷🍜",
        "description": "Firm wheat noodles...",
        "tags": ["vegetarian"],
        "defaults": {},
        "isActive": true,
        "sortOrder": 0
      }
    ]
  }
}
```

## Usage in Components

### Using the Menu Data Hook

```javascript
import { useMenuData } from './hooks/useMenuData';

function MyComponent() {
  const { menuOptions, loading, error } = useMenuData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {menuOptions.noodleBase.choices.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

### Direct API Call

```javascript
import { getMenuOptions } from '../utils/getMenuItems';

async function fetchMenu() {
  const menuOptions = await getMenuOptions();
  // Use menuOptions...
}
```

## Database Operations

### Adding a New Menu Item

```javascript
import { MenuService } from './db/menuService';

const newItem = await MenuService.addItem({
  categoryId: 1,
  name: 'New Noodle',
  price: 2.5,
  icon: '🍜',
  description: 'A new noodle option',
  tags: ['vegetarian'],
  defaults: {},
  isActive: true,
  sortOrder: 0
});
```

### Updating a Menu Item

```javascript
await MenuService.updateItem(1, {
  price: 3.0,
  description: 'Updated description'
});
```

### Deleting a Menu Item (Soft Delete)

```javascript
await MenuService.deleteItem(1);
```

## Fallback Behavior

If the database is unavailable, the application will automatically fall back to the static menu data in `data/menuOptions.js`. This ensures the application remains functional even if there are database connectivity issues.

## Development Notes

- The database uses soft deletes (setting `isActive` to false) rather than hard deletes
- All prices are stored as decimals with 2 decimal places
- Tags and defaults are stored as JSON fields for flexibility
- The schema supports the same data structure as the original static menu options
