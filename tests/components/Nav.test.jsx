import { render, screen, fireEvent } from '@testing-library/react';
import Nav from '../../components/Nav';
import '@testing-library/jest-dom';

jest.mock('next/link', () => {
  return ({ children, href, ...props }) => <a href={href} {...props}>{children}</a>;
});

describe('Nav', () => {
  it('renders nav button and menu closed by default', () => {
    render(<Nav />);
    expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Order/i })).not.toBeInTheDocument();
  });

  it('opens menu on nav button click', () => {
    render(<Nav />);
    const menuBtn = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(menuBtn);
    expect(screen.getByRole('link', { name: /Order/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /About/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /GitHub/i })).toBeInTheDocument();
  });

  it('closes menu when a link is clicked', () => {
    render(<Nav />);
    const menuBtn = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(menuBtn);
    const orderLink = screen.getByRole('link', { name: /Order/i });
    fireEvent.click(orderLink);
    // After click, menu should close (links disappear)
    expect(screen.queryByRole('link', { name: /Order/i })).not.toBeInTheDocument();
  });

  it('has accessible aria attributes', () => {
    render(<Nav />);
    const menuBtn = screen.getByRole('button', { name: /menu/i });
    expect(menuBtn).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(menuBtn);
    expect(menuBtn).toHaveAttribute('aria-expanded', 'true');
  });
});
