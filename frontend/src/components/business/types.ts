/**
 * Types for Student Registration Form
 */

import { INITIAL_FORM_STATE } from "./StudentRegistrationForm/constants";

// Form field errors type
export type FormErrors = {
  [key: string]: string | undefined;
  firstName?: string;
  lastName?: string;
  email?: string;
  dateOfBirth?: string;
  studentId?: string;
  phone?: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  enrollmentDate?: string;
  course?: string;
  department?: string;
  year?: string;
  guardianName?: string;
  guardianPhone?: string;
};

// Form state type derived from initial state
export type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string | null;
  studentId: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  enrollmentDate: string | null;
  course: string;
  department: string;
  year: number | "";
  guardianName: string;
  guardianPhone: string;
};
