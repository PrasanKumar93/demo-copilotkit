'use client';

import { useState } from 'react';
import MUISelect, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { SelectProps } from '../types';
import styles from './Select.module.scss';

/**
 * Select Component
 *
 * A wrapper around MUI Select with consistent interface.
 * Supports single and multiple selection modes.
 *
 * @example
 * ```tsx
 * <Select
 *   name="country"
 *   label="Country"
 *   value={country}
 *   onChange={(name, value) => setCountry(value)}
 *   options={[
 *     { value: 'us', label: 'United States' },
 *     { value: 'uk', label: 'United Kingdom' },
 *   ]}
 * />
 * ```
 */
const Select = ({
    name,
    label,
    value,
    onChange,
    options,
    error,
    helperText,
    placeholder,
    disabled = false,
    required = false,
    fullWidth = true,
    size = 'medium',
    className,
    multiple = false,
}: SelectProps) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (event: SelectChangeEvent<typeof value>) => {
        onChange(name, event.target.value);
    };

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const labelId = `${name}-label`;

    // Check if there's a value selected
    const hasValue = multiple
        ? Array.isArray(value) && value.length > 0
        : value !== '' && value !== undefined && value !== null;

    // Label should shrink (float up) when focused OR when there's a value
    const shouldShrink = isFocused || hasValue ? true : undefined;

    // Only show placeholder when focused and no value selected
    const showPlaceholder = !!(placeholder && isFocused && !hasValue);

    return (
        <div className={`${styles['select-wrapper']} ${className || ''}`}>
            <FormControl fullWidth={fullWidth} error={!!error} disabled={disabled} required={required} size={size}>
                <InputLabel id={labelId} shrink={shouldShrink}>{label}</InputLabel>
                <MUISelect
                    labelId={labelId}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onOpen={handleFocus}
                    onClose={handleBlur}
                    label={label}
                    multiple={multiple}
                    displayEmpty={showPlaceholder}
                    notched={shouldShrink}
                    renderValue={(selected) => {
                        // When no value and not focused, show nothing (label will be centered)
                        if (!hasValue && !isFocused) {
                            return '';
                        }
                        // When no value but focused, show placeholder
                        if (!hasValue && isFocused && placeholder) {
                            return <em className={styles.placeholder}>{placeholder}</em>;
                        }
                        // When value is selected, show the label
                        if (multiple && Array.isArray(selected)) {
                            return selected
                                .map((val) => options.find((opt) => opt.value === val)?.label)
                                .filter(Boolean)
                                .join(', ');
                        }
                        return options.find((opt) => opt.value === selected)?.label || '';
                    }}
                >
                    {options.map((option) => (
                        <MenuItem key={option.value} value={option.value} disabled={option.disabled}>
                            {option.label}
                        </MenuItem>
                    ))}
                </MUISelect>
                {(error || helperText) && <FormHelperText>{error || helperText}</FormHelperText>}
            </FormControl>
        </div>
    );
};

export default Select;
