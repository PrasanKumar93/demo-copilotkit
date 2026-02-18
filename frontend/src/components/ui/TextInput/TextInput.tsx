'use client';

import TextField from '@mui/material/TextField';
import { TextInputProps } from '../types';
import styles from './TextInput.module.scss';

/**
 * TextInput Component
 *
 * A wrapper around MUI TextField with consistent interface.
 * Supports text and password input types, as well as multiline (textarea) mode.
 *
 * @example
 * ```tsx
 * <TextInput
 *   name="firstName"
 *   label="First Name"
 *   value={firstName}
 *   onChange={(name, value) => setFirstName(value)}
 *   error="This field is required"
 * />
 * ```
 */
const TextInput = ({
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
    minLength,
    multiline = false,
    rows = 4,
    type = 'text',
}: TextInputProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(name, event.target.value);
    };

    return (
        <div className={`${styles['text-input-wrapper']} ${className || ''}`}>
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
                multiline={multiline}
                rows={multiline ? rows : undefined}
                type={type}
                slotProps={{
                    htmlInput: {
                        maxLength,
                        minLength,
                    },
                }}
            />
        </div>
    );
};

export default TextInput;
