import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import EmailInput from './EmailInput';

describe('EmailInput', () => {
  const defaultProps = {
    name: 'testEmail',
    label: 'Email Address',
    value: '',
    onChange: vi.fn(),
  };

  it('renders with label', () => {
    render(<EmailInput {...defaultProps} />);
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  });

  it('renders with type="email"', () => {
    render(<EmailInput {...defaultProps} />);
    const input = screen.getByLabelText(/email address/i);
    expect(input).toHaveAttribute('type', 'email');
  });

  it('displays the current value', () => {
    render(<EmailInput {...defaultProps} value="test@example.com" />);
    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
  });

  it('calls onChange with name and value when typing', () => {
    const handleChange = vi.fn();
    render(<EmailInput {...defaultProps} onChange={handleChange} />);

    const input = screen.getByLabelText(/email address/i);
    fireEvent.change(input, { target: { value: 'new@email.com' } });

    expect(handleChange).toHaveBeenCalledWith('testEmail', 'new@email.com');
  });

  it('displays error message when error prop is provided', () => {
    render(<EmailInput {...defaultProps} error="Invalid email format" />);
    expect(screen.getByText('Invalid email format')).toBeInTheDocument();
  });

  it('displays helper text when provided', () => {
    render(<EmailInput {...defaultProps} helperText="We'll never share your email" />);
    expect(screen.getByText("We'll never share your email")).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<EmailInput {...defaultProps} disabled />);
    expect(screen.getByLabelText(/email address/i)).toBeDisabled();
  });

  it('shows required indicator when required', () => {
    render(<EmailInput {...defaultProps} required />);
    expect(screen.getByLabelText(/email address \*/i)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<EmailInput {...defaultProps} className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});

