'use client';

import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { DatePickerProps } from '../types';
import styles from './DatePicker.module.scss';

/**
 * DatePicker Component
 *
 * A wrapper around MUI X DatePicker with consistent interface.
 * Uses dayjs for date handling.
 *
 * @example
 * ```tsx
 * <DatePicker
 *   name="birthDate"
 *   label="Date of Birth"
 *   value={birthDate}
 *   onChange={(name, value) => setBirthDate(value)}
 * />
 * ```
 */
const DatePicker = ({
    name,
    label,
    value,
    onChange,
    error,
    helperText,
    disabled = false,
    required = false,
    fullWidth = true,
    size = 'medium',
    className,
    minDate,
    maxDate,
    format = 'DD/MM/YYYY',
}: DatePickerProps) => {
    // Convert value to dayjs object
    const dateValue = value ? dayjs(value) : null;

    // Convert min/max dates to dayjs
    const minDateValue = minDate ? dayjs(minDate) : undefined;
    const maxDateValue = maxDate ? dayjs(maxDate) : undefined;

    const handleChange = (newValue: Dayjs | null) => {
        // Convert back to ISO string or null, only if valid
        const isoValue = newValue && newValue.isValid() ? newValue.toISOString() : null;
        onChange(name, isoValue);
    };

    return (
        <div className={`${styles['date-picker-wrapper']} ${className || ''}`}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MUIDatePicker
                    label={label}
                    value={dateValue}
                    onChange={handleChange}
                    disabled={disabled}
                    minDate={minDateValue}
                    maxDate={maxDateValue}
                    format={format}
                    slotProps={{
                        textField: {
                            name,
                            error: !!error,
                            helperText: error || helperText,
                            required,
                            fullWidth,
                            size,
                        },
                    }}
                />
            </LocalizationProvider>
        </div>
    );
};

export default DatePicker;
