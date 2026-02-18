import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Toast from './Toast';

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders with message', () => {
    render(<Toast message="Test message" />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('renders with correct role', () => {
    render(<Toast message="Test message" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders success type correctly', () => {
    render(<Toast message="Success!" type="success" />);
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('success');
  });

  it('renders error type correctly', () => {
    render(<Toast message="Error!" type="error" />);
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('error');
  });

  it('renders warning type correctly', () => {
    render(<Toast message="Warning!" type="warning" />);
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('warning');
  });

  it('renders info type correctly', () => {
    render(<Toast message="Info!" type="info" />);
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('info');
  });

  it('auto-dismisses after duration', async () => {
    const onDismiss = vi.fn();
    render(<Toast message="Test" duration={3000} onDismiss={onDismiss} />);

    expect(screen.getByText('Test')).toBeInTheDocument();

    // Fast-forward time
    vi.advanceTimersByTime(3000);
    // Wait for exit animation
    vi.advanceTimersByTime(300);

    await waitFor(() => {
      expect(onDismiss).toHaveBeenCalled();
    });
  });

  it('does not auto-dismiss when duration is 0', () => {
    const onDismiss = vi.fn();
    render(<Toast message="Test" duration={0} onDismiss={onDismiss} />);

    vi.advanceTimersByTime(10000);

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(onDismiss).not.toHaveBeenCalled();
  });

  it('dismisses on close button click', async () => {
    const onDismiss = vi.fn();
    render(<Toast message="Test" onDismiss={onDismiss} />);

    const closeButton = screen.getByLabelText('Dismiss notification');
    fireEvent.click(closeButton);

    // Wait for exit animation
    vi.advanceTimersByTime(300);

    await waitFor(() => {
      expect(onDismiss).toHaveBeenCalled();
    });
  });

  it('hides close button when showCloseButton is false', () => {
    render(<Toast message="Test" showCloseButton={false} />);
    expect(screen.queryByLabelText('Dismiss notification')).not.toBeInTheDocument();
  });

  it('renders with different positions', () => {
    const { rerender } = render(<Toast message="Test" position="top-right" />);
    const toast = screen.getByRole('alert');
    expect(toast).toHaveStyle({ top: '24px', right: '24px' });

    rerender(<Toast message="Test" position="bottom-left" />);
    expect(screen.getByRole('alert')).toHaveStyle({ bottom: '24px', left: '24px' });

    rerender(<Toast message="Test" position="bottom-right" />);
    expect(screen.getByRole('alert')).toHaveStyle({ bottom: '24px', right: '24px' });
  });

  it('does not render when isVisible is false', () => {
    render(<Toast message="Test" isVisible={false} />);
    expect(screen.queryByText('Test')).not.toBeInTheDocument();
  });
});

