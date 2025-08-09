// Integration test setup
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

// MSW server for API mocking
export const server = setupServer(
  http.get('/api/quotes/random', () => {
    return HttpResponse.json({ quote: 'Test quote', author: 'Test Author' });
  }),
  http.post('/api/orders', () => {
    return HttpResponse.json({ id: '123', status: 'created' });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());