// Enhanced component test with MSW
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import RamenBuilder from '../../components/RamenBuilder';

const server = setupServer(
  http.get('/api/menu', () => {
    return HttpResponse.json({
      noodleBase: [{ name: 'Forbidden Ramen', price: 0 }],
      protein: [{ name: 'Tofu', price: 1.75 }],
    });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('RamenBuilder with API', () => {
  it('loads menu items from API', async () => {
    render(<RamenBuilder />);
    
    await waitFor(() => {
      expect(screen.getByText('Forbidden Ramen')).toBeInTheDocument();
      expect(screen.getByText('Tofu')).toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    server.use(
      http.get('/api/menu', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(<RamenBuilder />);
    
    await waitFor(() => {
      expect(screen.getByText(/error loading menu/i)).toBeInTheDocument();
    });
  });
});