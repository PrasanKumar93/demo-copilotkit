import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders with children text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is disabled when loading', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows loading spinner when loading', () => {
    render(<Button loading>Submit</Button>);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders contained variant by default', () => {
    render(<Button>Default</Button>);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-contained');
  });

  it('renders outlined variant when specified', () => {
    render(<Button variant="outlined">Outlined</Button>);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-outlined');
  });

  it('renders text variant when specified', () => {
    render(<Button variant="text">Text</Button>);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-text');
  });

  it('renders with primary color by default', () => {
    render(<Button>Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-colorPrimary');
  });

  it('renders with secondary color when specified', () => {
    render(<Button color="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-colorSecondary');
  });

  it('renders with submit type when specified', () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('takes full width when fullWidth is true', () => {
    render(<Button fullWidth>Full Width</Button>);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-fullWidth');
  });

  it('renders small size when specified', () => {
    render(<Button size="small">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-sizeSmall');
  });

  it('renders large size when specified', () => {
    render(<Button size="large">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-sizeLarge');
  });

  it('applies custom className', () => {
    const { container } = render(<Button className="custom-class">Custom</Button>);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});

