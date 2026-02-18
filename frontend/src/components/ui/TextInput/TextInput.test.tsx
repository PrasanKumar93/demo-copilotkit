import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TextInput from './TextInput';

describe('TextInput', () => {
  const defaultProps = {
    name: 'testInput',
    label: 'Test Label',
    value: '',
    onChange: vi.fn(),
  };

  it('renders with label', () => {
    render(<TextInput {...defaultProps} />);
    expect(screen.getByLabelText(/test label/i)).toBeInTheDocument();
  });

  it('displays the current value', () => {
    render(<TextInput {...defaultProps} value="Hello" />);
    expect(screen.getByDisplayValue('Hello')).toBeInTheDocument();
  });

  it('calls onChange with name and value when typing', () => {
    const handleChange = vi.fn();
    render(<TextInput {...defaultProps} onChange={handleChange} />);

    const input = screen.getByLabelText(/test label/i);
    fireEvent.change(input, { target: { value: 'New Value' } });

    expect(handleChange).toHaveBeenCalledWith('testInput', 'New Value');
  });

  it('displays error message when error prop is provided', () => {
    render(<TextInput {...defaultProps} error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('displays helper text when provided', () => {
    render(<TextInput {...defaultProps} helperText="Enter your name" />);
    expect(screen.getByText('Enter your name')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<TextInput {...defaultProps} disabled />);
    expect(screen.getByLabelText(/test label/i)).toBeDisabled();
  });

  it('shows required indicator when required', () => {
    render(<TextInput {...defaultProps} required />);
    expect(screen.getByLabelText(/test label \*/i)).toBeInTheDocument();
  });

  it('renders as multiline textarea when multiline is true', () => {
    render(<TextInput {...defaultProps} multiline rows={5} />);
    const textarea = screen.getByLabelText(/test label/i);
    expect(textarea.tagName.toLowerCase()).toBe('textarea');
  });

  it('renders as password input when type is password', () => {
    render(<TextInput {...defaultProps} type="password" />);
    const input = screen.getByLabelText(/test label/i);
    expect(input).toHaveAttribute('type', 'password');
  });

  it('applies custom className', () => {
    const { container } = render(<TextInput {...defaultProps} className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});

