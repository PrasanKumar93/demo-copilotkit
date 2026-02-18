'use client';

import MUIButton from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { ButtonProps } from '../types';
import styles from './Button.module.scss';

/**
 * Button Component
 *
 * A wrapper around MUI Button with consistent interface.
 * Supports various variants, colors, and a loading state.
 *
 * @example
 * ```tsx
 * <Button onClick={handleSubmit} loading={isSubmitting}>
 *   Submit
 * </Button>
 * ```
 */
const Button = ({
    children,
    onClick,
    variant = 'contained',
    color = 'primary',
    type = 'button',
    disabled = false,
    loading = false,
    fullWidth = false,
    size = 'medium',
    className,
    startIcon,
    endIcon,
}: ButtonProps) => {
    return (
        <div className={`${styles['button-wrapper']} ${className || ''}`}>
            <MUIButton
                onClick={onClick}
                variant={variant}
                color={color}
                type={type}
                disabled={disabled || loading}
                fullWidth={fullWidth}
                size={size}
                startIcon={loading ? undefined : startIcon}
                endIcon={loading ? undefined : endIcon}
            >
                {loading ? (
                    <>
                        <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                        {children}
                    </>
                ) : (
                    children
                )}
            </MUIButton>
        </div>
    );
};

export default Button;
