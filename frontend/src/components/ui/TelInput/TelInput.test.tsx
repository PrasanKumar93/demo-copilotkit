import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TelInput from './TelInput';

describe('TelInput', () => {
  const defaultProps = {
    name: 'testPhone',
    label: 'Phone Number',
    value: '',
    onChange: vi.fn(),
  };

  it('renders with label', () => {
    render(<TelInput {...defaultProps} />);
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
  });

  it('renders with type="tel"', () => {
    render(<TelInput {...defaultProps} />);
    const input = screen.getByLabelText(/phone number/i);
    expect(input).toHaveAttribute('type', 'tel');
  });

  it('displays the current value', () => {
    render(<TelInput {...defaultProps} value="1234567890" />);
    expect(screen.getByDisplayValue('1234567890')).toBeInTheDocument();
  });

  it('calls onChange with name and value when typing', () => {
    const handleChange = vi.fn();
    render(<TelInput {...defaultProps} onChange={handleChange} />);

    const input = screen.getByLabelText(/phone number/i);
    fireEvent.change(input, { target: { value: '9876543210' } });

    expect(handleChange).toHaveBeenCalledWith('testPhone', '9876543210');
  });

  it('displays error message when error prop is provided', () => {
    render(<TelInput {...defaultProps} error="Invalid phone number" />);
    expect(screen.getByText('Invalid phone number')).toBeInTheDocument();
  });

  it('displays helper text when provided', () => {
    render(<TelInput {...defaultProps} helperText="Enter your mobile number" />);
    expect(screen.getByText('Enter your mobile number')).toBeInTheDocument();
  });

  it('shows country code adornment when provided', () => {
    render(<TelInput {...defaultProps} countryCode="+1" />);
    expect(screen.getByText('+1')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<TelInput {...defaultProps} disabled />);
    expect(screen.getByLabelText(/phone number/i)).toBeDisabled();
  });

  it('shows required indicator when required', () => {
    render(<TelInput {...defaultProps} required />);
    expect(screen.getByLabelText(/phone number \*/i)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<TelInput {...defaultProps} className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});

