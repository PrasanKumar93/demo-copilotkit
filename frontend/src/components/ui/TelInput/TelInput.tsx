'use client';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { TelInputProps } from '../types';
import styles from './TelInput.module.scss';

/**
 * TelInput Component
 *
 * A wrapper around MUI TextField specifically for telephone/phone input.
 * Supports optional country code prefix.
 *
 * @example
 * ```tsx
 * <TelInput
 *   name="phone"
 *   label="Phone Number"
 *   value={phone}
 *   onChange={(name, value) => setPhone(value)}
 *   countryCode="+1"
 * />
 * ```
 */
const TelInput = ({
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
    countryCode,
    maxLength,
}: TelInputProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(name, event.target.value);
    };

    return (
        <div className={`${styles['tel-input-wrapper']} ${className || ''}`}>
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
                type="tel"
                slotProps={{
                    input: countryCode
                        ? {
                            startAdornment: (
                                <InputAdornment position="start">{countryCode}</InputAdornment>
                            ),
                        }
                        : undefined,
                    htmlInput: {
                        maxLength,
                    },
                }}
            />
        </div>
    );
};

export default TelInput;
