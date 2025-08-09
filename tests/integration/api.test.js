// Integration test example - API routes
import { GET } from '../../app/quotes/random/route';

describe('/api/quotes/random', () => {
  it('returns random quote', async () => {
    const request = new Request('http://localhost:3000/api/quotes/random');
    const response = await GET(request);
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data).toHaveProperty('quote');
    expect(data).toHaveProperty('author');
  });
});