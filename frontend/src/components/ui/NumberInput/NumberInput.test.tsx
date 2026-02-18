import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NumberInput from './NumberInput';

describe('NumberInput', () => {
  const defaultProps = {
    name: 'testNumber',
    label: 'Amount',
    value: '',
    onChange: vi.fn(),
  };

  it('renders with label', () => {
    render(<NumberInput {...defaultProps} />);
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
  });

  it('renders with type="number"', () => {
    render(<NumberInput {...defaultProps} />);
    const input = screen.getByLabelText(/amount/i);
    expect(input).toHaveAttribute('type', 'number');
  });

  it('displays the current value', () => {
    render(<NumberInput {...defaultProps} value={42} />);
    expect(screen.getByDisplayValue('42')).toBeInTheDocument();
  });

  it('calls onChange with name and numeric value when typing', () => {
    const handleChange = vi.fn();
    render(<NumberInput {...defaultProps} onChange={handleChange} />);

    const input = screen.getByLabelText(/amount/i);
    fireEvent.change(input, { target: { value: '100' } });

    expect(handleChange).toHaveBeenCalledWith('testNumber', 100);
  });

  it('allows clearing the field', () => {
    const handleChange = vi.fn();
    render(<NumberInput {...defaultProps} value={50} onChange={handleChange} />);

    const input = screen.getByLabelText(/amount/i);
    fireEvent.change(input, { target: { value: '' } });

    expect(handleChange).toHaveBeenCalledWith('testNumber', '');
  });

  it('displays error message when error prop is provided', () => {
    render(<NumberInput {...defaultProps} error="Value must be positive" />);
    expect(screen.getByText('Value must be positive')).toBeInTheDocument();
  });

  it('displays helper text when provided', () => {
    render(<NumberInput {...defaultProps} helperText="Enter a number between 1-100" />);
    expect(screen.getByText('Enter a number between 1-100')).toBeInTheDocument();
  });

  it('applies min attribute', () => {
    render(<NumberInput {...defaultProps} min={0} />);
    const input = screen.getByLabelText(/amount/i);
    expect(input).toHaveAttribute('min', '0');
  });

  it('applies max attribute', () => {
    render(<NumberInput {...defaultProps} max={100} />);
    const input = screen.getByLabelText(/amount/i);
    expect(input).toHaveAttribute('max', '100');
  });

  it('applies step attribute', () => {
    render(<NumberInput {...defaultProps} step={0.5} />);
    const input = screen.getByLabelText(/amount/i);
    expect(input).toHaveAttribute('step', '0.5');
  });

  it('is disabled when disabled prop is true', () => {
    render(<NumberInput {...defaultProps} disabled />);
    expect(screen.getByLabelText(/amount/i)).toBeDisabled();
  });

  it('shows required indicator when required', () => {
    render(<NumberInput {...defaultProps} required />);
    expect(screen.getByLabelText(/amount \*/i)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<NumberInput {...defaultProps} className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});

