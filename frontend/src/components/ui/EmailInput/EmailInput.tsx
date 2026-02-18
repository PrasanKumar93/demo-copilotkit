'use client';

import TextField from '@mui/material/TextField';
import { EmailInputProps } from '../types';
import styles from './EmailInput.module.scss';

/**
 * EmailInput Component
 *
 * A wrapper around MUI TextField specifically for email input.
 * Provides consistent interface with other form components.
 *
 * @example
 * ```tsx
 * <EmailInput
 *   name="email"
 *   label="Email Address"
 *   value={email}
 *   onChange={(name, value) => setEmail(value)}
 *   error="Please enter a valid email"
 * />
 * ```
 */
const EmailInput = ({
    name,
    label,
    value,
    onChange,
    error,
    helperText,
    placeholder,
    disabled = false,
    required = false,
    fullWidth = true,
    size = 'medium',
    className,
    maxLength,
}: EmailInputProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(name, event.target.value);
    };

    return (
        <div className={`${styles['email-input-wrapper']} ${className || ''}`}>
            <TextField
                name={name}
                label={label}
                value={value}
                onChange={handleChange}
                error={!!error}
                helperText={error || helperText}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                fullWidth={fullWidth}
                size={size}
                type="email"
                slotProps={{
                    htmlInput: {
                        maxLength,
                    },
                }}
            />
        </div>
    );
};

export default EmailInput;
