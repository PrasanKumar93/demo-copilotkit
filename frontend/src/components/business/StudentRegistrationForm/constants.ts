/**
 * Constants for Student Registration Form
 */

// Department options for the select dropdown
export const DEPARTMENT_OPTIONS = [
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'electrical-engineering', label: 'Electrical Engineering' },
    { value: 'mechanical-engineering', label: 'Mechanical Engineering' },
    { value: 'civil-engineering', label: 'Civil Engineering' },
    { value: 'business', label: 'Business Administration' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'biology', label: 'Biology' },
    { value: 'arts', label: 'Arts & Humanities' },
] as const;

// Country options for the select dropdown
export const COUNTRY_OPTIONS = [
    { value: 'India', label: 'India' },
    { value: 'USA', label: 'United States' },
    { value: 'Canada', label: 'Canada' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'Australia', label: 'Australia' },
    { value: 'Germany', label: 'Germany' },
    { value: 'France', label: 'France' },
    { value: 'China', label: 'China' },
    { value: 'Japan', label: 'Japan' },
    { value: 'Other', label: 'Other' },
] as const;

// Initial form state
export const INITIAL_FORM_STATE = {
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: null as string | null,
    studentId: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    enrollmentDate: null as string | null,
    course: '',
    department: '',
    year: '' as number | '',
    guardianName: '',
    guardianPhone: '',
} as const;

// Toast configuration
export const TOAST_CONFIG = {
    position: 'top-right' as const,
    duration: 6000,
};

