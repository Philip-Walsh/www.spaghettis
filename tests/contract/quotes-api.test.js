// Contract test example using Pact
import { Pact } from '@pact-foundation/pact';
import path from 'path';

const provider = new Pact({
  consumer: 'ramen-frontend',
  provider: 'quotes-api',
  port: 1234,
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  logLevel: 'INFO',
});

describe('Quotes API Contract', () => {
  beforeAll(() => provider.setup());
  afterAll(() => provider.finalize());

  it('should return a random quote', async () => {
    await provider.addInteraction({
      state: 'quotes exist',
      uponReceiving: 'a request for a random quote',
      withRequest: {
        method: 'GET',
        path: '/api/quotes/random',
      },
      willRespondWith: {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: {
          quote: 'Test quote',
          author: 'Test Author',
        },
      },
    });

    const response = await fetch(`http://localhost:1234/api/quotes/random`);
    const data = await response.json();

    expect(data.quote).toBe('Test quote');
    expect(data.author).toBe('Test Author');
  });
});