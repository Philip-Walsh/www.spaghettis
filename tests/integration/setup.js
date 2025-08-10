// Integration test setup
const { setupServer } = require('msw/node');
const { http, HttpResponse } = require('msw');

// MSW server for API mocking
const server = setupServer(
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

module.exports = { server };