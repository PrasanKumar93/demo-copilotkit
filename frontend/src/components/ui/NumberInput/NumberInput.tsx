'use client';

import TextField from '@mui/material/TextField';
import { NumberInputProps } from '../types';
import styles from './NumberInput.module.scss';

/**
 * NumberInput Component
 *
 * A wrapper around MUI TextField specifically for numeric input.
 * Supports min/max constraints, step increments, and decimal places.
 *
 * @example
 * ```tsx
 * <NumberInput
 *   name="age"
 *   label="Age"
 *   value={age}
 *   onChange={(name, value) => setAge(value)}
 *   min={0}
 *   max={120}
 * />
 * ```
 */
const NumberInput = ({
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
    min,
    max,
    step = 1,
}: NumberInputProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;

        // Allow empty string for clearing the field
        if (inputValue === '') {
            onChange(name, '');
            return;
        }

        // Parse the value
        const numValue = parseFloat(inputValue);

        // Only update if it's a valid number
        if (!isNaN(numValue)) {
            onChange(name, numValue);
        }
    };

    return (
        <div className={`${styles['number-input-wrapper']} ${className || ''}`}>
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
                type="number"
                slotProps={{
                    htmlInput: {
                        min,
                        max,
                        step,
                    },
                }}
            />
        </div>
    );
};

export default NumberInput;
