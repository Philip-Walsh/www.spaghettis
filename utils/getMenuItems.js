export async function getMenuItems() {
    try {
        const res = await fetch('https://api.example.com/menu');
        if (!res.ok) throw new Error('API error');
        const data = await res.json();
        return data;
    } catch (e) {
        // fallback to local static data
        const local = await import('../data/menu.json');
        return local.default || local;
    }
}
