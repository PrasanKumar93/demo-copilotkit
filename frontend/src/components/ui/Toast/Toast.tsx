'use client';

import { useEffect, useState, useCallback } from 'react';
import styles from './Toast.module.scss';

export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface ToastProps {
  /** Unique identifier for the toast */
  id?: string;
  /** Message to display */
  message: string;
  /** Type of toast (affects styling) */
  type?: ToastType;
  /** Duration in milliseconds before auto-dismiss (0 = no auto-dismiss) */
  duration?: number;
  /** Position on screen */
  position?: ToastPosition;
  /** Whether the toast is visible */
  isVisible?: boolean;
  /** Callback when toast is dismissed */
  onDismiss?: () => void;
  /** Show close button */
  showCloseButton?: boolean;
  /** Custom inline styles */
  style?: React.CSSProperties;
}

/**
 * Toast Component
 * 
 * A notification component that displays temporary messages.
 * Supports success, error, warning, and info variants.
 */
const Toast = ({
  message,
  type = 'info',
  duration = 5000,
  position = 'top-right',
  isVisible = true,
  onDismiss,
  showCloseButton = true,
  style,
}: ToastProps) => {
  const [visible, setVisible] = useState(isVisible);
  const [isExiting, setIsExiting] = useState(false);

  const handleDismiss = useCallback(() => {
    setIsExiting(true);
    // Wait for exit animation to complete
    setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, 300);
  }, [onDismiss]);

  useEffect(() => {
    setVisible(isVisible);
    setIsExiting(false);
  }, [isVisible]);

  useEffect(() => {
    if (duration > 0 && visible && !isExiting) {
      const timer = setTimeout(handleDismiss, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, visible, isExiting, handleDismiss]);

  if (!visible) return null;

  // Get position styles (more reliable than CSS modules with hyphenated names)
  const getPositionStyles = (): React.CSSProperties => {
    const spacing = '24px';
    switch (position) {
      case 'top-right':
        return { top: spacing, right: spacing };
      case 'top-left':
        return { top: spacing, left: spacing };
      case 'bottom-right':
        return { bottom: spacing, right: spacing };
      case 'bottom-left':
        return { bottom: spacing, left: spacing };
      case 'top-center':
        return { top: spacing, left: '50%', transform: 'translateX(-50%)' };
      case 'bottom-center':
        return { bottom: spacing, left: '50%', transform: 'translateX(-50%)' };
      default:
        return { top: spacing, right: spacing };
    }
  };

  // Get animation class based on position
  const getAnimationClass = () => {
    if (position.includes('right')) {
      return isExiting ? styles.exitRight : styles.enterRight;
    } else if (position.includes('left')) {
      return isExiting ? styles.exitLeft : styles.enterLeft;
    } else if (position === 'top-center') {
      return isExiting ? styles.exitTop : styles.enterTop;
    } else if (position === 'bottom-center') {
      return isExiting ? styles.exitBottom : styles.enterBottom;
    }
    return isExiting ? styles.exitRight : styles.enterRight;
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        );
      case 'error':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
        );
      case 'warning':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
          </svg>
        );
      case 'info':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
          </svg>
        );
    }
  };

  return (
    <div
      className={`${styles.toast} ${styles[type]} ${getAnimationClass()}`}
      role="alert"
      aria-live="polite"
      style={{ ...getPositionStyles(), ...style }}
    >
      <div className={styles.iconWrapper}>{getIcon()}</div>
      <div className={styles.content}>
        <p className={styles.message}>{message}</p>
      </div>
      {showCloseButton && (
        <button
          className={styles.closeButton}
          onClick={handleDismiss}
          aria-label="Dismiss notification"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Toast;

