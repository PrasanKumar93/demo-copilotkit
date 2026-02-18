// ===========================================
// SHARED UI COMPONENT TYPES
// ===========================================

/**
 * Base props shared by ALL form field components.
 * This ensures consistent interface across components,
 * allowing easy swapping (e.g., TextInput → NumberInput).
 */
export interface BaseFieldProps {
  /** Unique field identifier */
  name: string;

  /** Display label for the field */
  label: string;

  /** Current field value */
  value: string | number;

  /**
   * Unified change handler.
   * Receives field name and new value for easy form state management.
   */
  onChange: (name: string, value: string | number) => void;

  /** Error message to display (shows error state when present) */
  error?: string;

  /** Helper text shown below the field */
  helperText?: string;

  /** Placeholder text */
  placeholder?: string;

  /** Whether the field is disabled */
  disabled?: boolean;

  /** Whether the field is required */
  required?: boolean;

  /** Whether the field takes full width of container */
  fullWidth?: boolean;

  /** Field size variant */
  size?: "small" | "medium";

  /** Additional CSS class name */
  className?: string;
}

/**
 * Props for TextInput component
 */
export interface TextInputProps extends BaseFieldProps {
  /** Maximum character length */
  maxLength?: number;

  /** Minimum character length */
  minLength?: number;

  /** Enable multiline (textarea) mode */
  multiline?: boolean;

  /** Number of rows for multiline mode */
  rows?: number;

  /** Input type (text, password) */
  type?: "text" | "password";
}

/**
 * Props for EmailInput component
 */
export interface EmailInputProps extends BaseFieldProps {
  /** Maximum character length */
  maxLength?: number;
}

/**
 * Props for TelInput component
 */
export interface TelInputProps extends BaseFieldProps {
  /** Country code prefix (e.g., "+1", "+91") */
  countryCode?: string;

  /** Maximum character length */
  maxLength?: number;
}

/**
 * Props for NumberInput component
 */
export interface NumberInputProps extends BaseFieldProps {
  /** Override value type for numbers */
  value: number | string;

  /** Minimum allowed value */
  min?: number;

  /** Maximum allowed value */
  max?: number;

  /** Step increment */
  step?: number;

  /** Number of decimal places */
  decimalPlaces?: number;
}

/**
 * Option type for Select component
 */
export interface SelectOption {
  /** Option value */
  value: string | number;

  /** Display label */
  label: string;

  /** Whether option is disabled */
  disabled?: boolean;
}

/**
 * Props for Select component
 */
export interface SelectProps
  extends Omit<BaseFieldProps, "value" | "onChange"> {
  /** Current selected value(s) */
  value: string | number | (string | number)[];

  /** Change handler for select */
  onChange: (
    name: string,
    value: string | number | (string | number)[]
  ) => void;

  /** Available options */
  options: SelectOption[];

  /** Allow multiple selection */
  multiple?: boolean;
}

/**
 * Props for DatePicker component
 */
export interface DatePickerProps
  extends Omit<BaseFieldProps, "value" | "onChange"> {
  /** Current date value (ISO string or Date object) */
  value: string | Date | null;

  /** Change handler for date */
  onChange: (name: string, value: string | null) => void;

  /** Minimum selectable date */
  minDate?: Date | string;

  /** Maximum selectable date */
  maxDate?: Date | string;

  /** Date format for display */
  format?: string;
}

/**
 * Button variant types
 */
export type ButtonVariant = "contained" | "outlined" | "text";

/**
 * Button color types
 */
export type ButtonColor =
  | "primary"
  | "secondary"
  | "error"
  | "success"
  | "warning"
  | "info";

/**
 * Props for Button component
 */
export interface ButtonProps {
  /** Button content */
  children: React.ReactNode;

  /** Click handler */
  onClick?: () => void;

  /** Button style variant */
  variant?: ButtonVariant;

  /** Button color */
  color?: ButtonColor;

  /** Button type attribute */
  type?: "button" | "submit" | "reset";

  /** Whether button is disabled */
  disabled?: boolean;

  /** Show loading spinner */
  loading?: boolean;

  /** Whether button takes full width */
  fullWidth?: boolean;

  /** Button size */
  size?: "small" | "medium" | "large";

  /** Additional CSS class name */
  className?: string;

  /** Start icon element */
  startIcon?: React.ReactNode;

  /** End icon element */
  endIcon?: React.ReactNode;
}
