import { render, screen } from '@testing-library/react';
import HomePage from '../../app/page';
import AboutPage from '../../app/about/page';
import RamenPage from '../../app/ramen/page';
import MenuPage from '../../app/menu/page';
import ImageCdnPage from '../../app/image-cdn/page';

// Home page
it('renders HomePage with hero and links', () => {
    render(<HomePage />);
    expect(screen.getByText(/forbidden ramen/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /start your order/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /learn more/i })).toBeInTheDocument();
});

// About page
it('renders AboutPage with open source info', () => {
    render(<AboutPage />);
    expect(screen.getByText(/about forbidden ramen/i)).toBeInTheDocument();
    expect(screen.getByText(/open source/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /github.com/i })).toBeInTheDocument();
});

// Ramen page
it('renders RamenPage with builder', () => {
    render(<RamenPage />);
    expect(screen.getByText(/build your perfect ramen/i)).toBeInTheDocument();
});

// Menu page
it('renders MenuPage with menu title', () => {
    render(<MenuPage />);
    expect(screen.getByText(/our noodle menu/i)).toBeInTheDocument();
});

// Image CDN page
it('renders ImageCdnPage', () => {
    render(<ImageCdnPage />);
    expect(screen.getByText(/image/i)).toBeInTheDocument();
});
