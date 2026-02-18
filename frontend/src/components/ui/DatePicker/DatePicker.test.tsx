import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DatePicker from './DatePicker';

describe('DatePicker', () => {
  const defaultProps = {
    name: 'testDate',
    label: 'Select Date',
    value: null,
    onChange: vi.fn(),
  };

  it('renders with label', () => {
    render(<DatePicker {...defaultProps} />);
    // MUI DatePicker renders label in a specific label element
    expect(screen.getByRole('group')).toBeInTheDocument();
  });

  it('displays the current value formatted', () => {
    render(<DatePicker {...defaultProps} value="2024-01-15" />);
    // The date sections are displayed separately in MUI X DatePicker
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
  });

  it('displays error message when error prop is provided', () => {
    render(<DatePicker {...defaultProps} error="Please select a valid date" />);
    expect(screen.getByText('Please select a valid date')).toBeInTheDocument();
  });

  it('displays helper text when provided', () => {
    render(<DatePicker {...defaultProps} helperText="Select your preferred date" />);
    expect(screen.getByText('Select your preferred date')).toBeInTheDocument();
  });

  it('renders in disabled state when disabled prop is true', () => {
    const { container } = render(<DatePicker {...defaultProps} disabled />);
    // Check for disabled class on the MUI component
    expect(container.querySelector('.Mui-disabled')).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    render(<DatePicker {...defaultProps} required />);
    // Required adds an asterisk to the label
    expect(screen.getByText(/select date \*/i)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<DatePicker {...defaultProps} className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('uses custom format when provided', () => {
    render(<DatePicker {...defaultProps} value="2024-01-15" format="YYYY-MM-DD" />);
    // With YYYY-MM-DD format, the year comes first
    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
  });
});

