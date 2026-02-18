import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import Select from './Select';

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
];

describe('Select', () => {
  const defaultProps = {
    name: 'testSelect',
    label: 'Select Option',
    value: '',
    onChange: vi.fn(),
    options: mockOptions,
  };

  it('renders with label', () => {
    render(<Select {...defaultProps} />);
    expect(screen.getByLabelText(/select option/i)).toBeInTheDocument();
  });

  it('displays options when clicked', async () => {
    render(<Select {...defaultProps} />);

    // Click to open the select
    const select = screen.getByLabelText(/select option/i);
    fireEvent.mouseDown(select);

    // Check that options are visible
    const listbox = screen.getByRole('listbox');
    expect(within(listbox).getByText('Option 1')).toBeInTheDocument();
    expect(within(listbox).getByText('Option 2')).toBeInTheDocument();
    expect(within(listbox).getByText('Option 3')).toBeInTheDocument();
  });

  it('calls onChange when an option is selected', () => {
    const handleChange = vi.fn();
    render(<Select {...defaultProps} onChange={handleChange} />);

    // Open the select
    const select = screen.getByLabelText(/select option/i);
    fireEvent.mouseDown(select);

    // Select an option
    const listbox = screen.getByRole('listbox');
    fireEvent.click(within(listbox).getByText('Option 1'));

    expect(handleChange).toHaveBeenCalledWith('testSelect', 'option1');
  });

  it('displays the selected value', () => {
    render(<Select {...defaultProps} value="option2" />);
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('displays error message when error prop is provided', () => {
    render(<Select {...defaultProps} error="Please select an option" />);
    expect(screen.getByText('Please select an option')).toBeInTheDocument();
  });

  it('displays helper text when provided', () => {
    render(<Select {...defaultProps} helperText="Choose your preferred option" />);
    expect(screen.getByText('Choose your preferred option')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Select {...defaultProps} disabled />);
    // MUI Select uses aria-disabled instead of disabled attribute
    const select = screen.getByLabelText(/select option/i);
    expect(select).toHaveAttribute('aria-disabled', 'true');
  });

  it('shows required indicator when required', () => {
    render(<Select {...defaultProps} required />);
    expect(screen.getByLabelText(/select option \*/i)).toBeInTheDocument();
  });

  it('supports multiple selection', () => {
    const handleChange = vi.fn();
    render(<Select {...defaultProps} multiple value={[]} onChange={handleChange} />);

    // Open the select
    const select = screen.getByLabelText(/select option/i);
    fireEvent.mouseDown(select);

    // Select first option
    const listbox = screen.getByRole('listbox');
    fireEvent.click(within(listbox).getByText('Option 1'));

    expect(handleChange).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const { container } = render(<Select {...defaultProps} className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});

