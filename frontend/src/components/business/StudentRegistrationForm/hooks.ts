/**
 * Custom hook for Student Registration Form logic
 * Handles all state management, validation, and form submission
 */

import { useState, FormEvent } from "react";
import type { ToastType } from "@/components/ui";
import { CreateStudentSchema } from "@/lib/validators";
import { createStudent } from "@/lib/api";
import type { CreateStudentInput } from "@/types";
import { INITIAL_FORM_STATE } from "./constants";
import type { FormErrors, FormState } from "../types";

// Helper to create a mutable copy of initial state
const getInitialState = (): FormState => ({
  firstName: "",
  lastName: "",
  email: "",
  dateOfBirth: null,
  studentId: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  zipCode: "",
  country: "India",
  enrollmentDate: null,
  course: "",
  department: "",
  year: "",
  guardianName: "",
  guardianPhone: "",
});

export const useStudentRegistrationForm = () => {
  // Form state
  const [formData, setFormData] = useState<FormState>(getInitialState());
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  // Toast state
  const [toastVisible, setToastVisible] = useState(false);
  const [toastType, setToastType] = useState<ToastType>("success");
  const [toastMessage, setToastMessage] = useState("");

  // Show toast notification
  const showToast = (type: ToastType, message: string) => {
    setToastType(type);
    setToastMessage(message);
    setToastVisible(true);
  };

  // Hide toast notification
  const hideToast = () => {
    setToastVisible(false);
  };

  // Generic field change handler
  const handleChange = (name: string, value: string | number | null) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Handler for Select components (supports array values for multi-select)
  const handleSelectChange = (
    name: string,
    value: string | number | (string | number)[]
  ) => {
    // For our form, we only use single-select, so extract string value
    const singleValue = Array.isArray(value) ? value[0] : value;
    handleChange(name, singleValue as string);
  };

  // Validate form data using Zod schema
  const validateForm = (): boolean => {
    // Build the data object for validation
    const dataToValidate: CreateStudentInput = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      dateOfBirth: formData.dateOfBirth
        ? new Date(formData.dateOfBirth)
        : new Date(),
      studentId: formData.studentId,
      phone: formData.phone,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
      },
      enrollmentDate: formData.enrollmentDate
        ? new Date(formData.enrollmentDate)
        : new Date(),
      course: formData.course,
      department: formData.department,
      year: typeof formData.year === "number" ? formData.year : 1,
      guardianName: formData.guardianName || undefined,
      guardianPhone: formData.guardianPhone || undefined,
    };

    const result = CreateStudentSchema.safeParse(dataToValidate);

    if (!result.success) {
      const newErrors: FormErrors = {};

      result.error.issues.forEach((issue) => {
        const path = issue.path.join(".");
        // Map nested address fields to flat field names
        if (path.startsWith("address.")) {
          const addressField = path.replace("address.", "");
          newErrors[addressField] = issue.message;
        } else {
          newErrors[path] = issue.message;
        }
      });

      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  // Build student data from form state
  const buildStudentData = (): CreateStudentInput => ({
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    dateOfBirth: new Date(formData.dateOfBirth!),
    studentId: formData.studentId,
    phone: formData.phone,
    address: {
      street: formData.street,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      country: formData.country,
    },
    enrollmentDate: new Date(formData.enrollmentDate!),
    course: formData.course,
    department: formData.department,
    year: formData.year as number,
    guardianName: formData.guardianName || undefined,
    guardianPhone: formData.guardianPhone || undefined,
  });

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Hide any existing toast
    hideToast();

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const studentData = buildStudentData();
      const createdStudent = await createStudent(studentData);

      // Show success toast
      showToast(
        "success",
        `Student "${createdStudent.firstName} ${createdStudent.lastName}" has been registered successfully!`
      );

      // Reset form on success
      setFormData(getInitialState());
      setErrors({});
      setResetKey((prev) => prev + 1);
    } catch (error) {
      // Show error toast
      if (error instanceof Error) {
        showToast("error", error.message);
      } else {
        showToast("error", "An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle form reset
  const handleReset = () => {
    setFormData(getInitialState());
    setErrors({});
    hideToast();
    setResetKey((prev) => prev + 1);
  };

  return {
    // Form state
    formData,
    errors,
    isSubmitting,
    resetKey,

    // Toast state
    toastVisible,
    toastType,
    toastMessage,

    // Handlers
    handleChange,
    handleSelectChange,
    handleSubmit,
    handleReset,
    hideToast,
  };
};
