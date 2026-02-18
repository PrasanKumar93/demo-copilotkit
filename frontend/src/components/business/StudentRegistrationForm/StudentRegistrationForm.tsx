'use client';

import {
    TextInput,
    EmailInput,
    TelInput,
    NumberInput,
    Select,
    DatePicker,
    Button,
    Toast,
} from '@/components/ui';
import { DEPARTMENT_OPTIONS, COUNTRY_OPTIONS, TOAST_CONFIG } from './constants';
import { useStudentRegistrationForm } from './hooks';
import styles from './StudentRegistrationForm.module.scss';

/**
 * StudentRegistrationForm Component
 *
 * A comprehensive form for registering new students.
 * Features client-side validation with Zod and integration with the backend API.
 */
const StudentRegistrationForm = () => {
    const {
        formData,
        errors,
        isSubmitting,
        resetKey,
        toastVisible,
        toastType,
        toastMessage,
        handleChange,
        handleSelectChange,
        handleSubmit,
        handleReset,
        hideToast,
    } = useStudentRegistrationForm();

    return (
        <>
            {/* Toast Notification */}
            <Toast
                message={toastMessage}
                type={toastType}
                isVisible={toastVisible}
                onDismiss={hideToast}
                position={TOAST_CONFIG.position}
                duration={TOAST_CONFIG.duration}
            />

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.header}>
                    <h1 className={styles.title}>Student Registration</h1>
                    <p className={styles.subtitle}>
                        Please fill out all required fields to register a new student.
                    </p>
                </div>

                {/* Personal Information Section */}
                <fieldset className={styles.section}>
                    <legend className={styles.sectionTitle}>Personal Information</legend>
                    <div className={styles.row}>
                        <TextInput
                            name="firstName"
                            label="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            error={errors.firstName}
                            required
                            placeholder="Enter first name"
                        />
                        <TextInput
                            name="lastName"
                            label="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            error={errors.lastName}
                            required
                            placeholder="Enter last name"
                        />
                    </div>
                    <div className={styles.row}>
                        <EmailInput
                            name="email"
                            label="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                            required
                            placeholder="student@university.edu"
                        />
                        <DatePicker
                            key={`dateOfBirth-${resetKey}`}
                            name="dateOfBirth"
                            label="Date of Birth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            error={errors.dateOfBirth}
                            required
                            maxDate={new Date().toISOString()}
                        />
                    </div>
                    <div className={styles.row}>
                        <TextInput
                            name="studentId"
                            label="Student ID"
                            value={formData.studentId}
                            onChange={handleChange}
                            error={errors.studentId}
                            required
                            placeholder="e.g., STU-2024-001"
                        />
                        <TelInput
                            name="phone"
                            label="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            error={errors.phone}
                            required
                            placeholder="Enter phone number"
                            countryCode="+91"
                            maxLength={10}
                        />
                    </div>
                </fieldset>

                {/* Address Section */}
                <fieldset className={styles.section}>
                    <legend className={styles.sectionTitle}>Address</legend>
                    <div className={styles.row}>
                        <TextInput
                            name="street"
                            label="Street Address"
                            value={formData.street}
                            onChange={handleChange}
                            error={errors.street}
                            required
                            placeholder="123 Main Street"
                        />
                    </div>
                    <div className={styles.row}>
                        <TextInput
                            name="city"
                            label="City"
                            value={formData.city}
                            onChange={handleChange}
                            error={errors.city}
                            required
                            placeholder="Enter city"
                        />
                        <TextInput
                            name="state"
                            label="State / Province"
                            value={formData.state}
                            onChange={handleChange}
                            error={errors.state}
                            required
                            placeholder="Enter state"
                        />
                    </div>
                    <div className={styles.row}>
                        <TextInput
                            name="zipCode"
                            label="ZIP / Postal Code"
                            value={formData.zipCode}
                            onChange={handleChange}
                            error={errors.zipCode}
                            required
                            placeholder="12345"
                        />
                        <Select
                            name="country"
                            label="Country"
                            value={formData.country}
                            onChange={handleSelectChange}
                            error={errors.country}
                            options={[...COUNTRY_OPTIONS]}
                            required
                        />
                    </div>
                </fieldset>

                {/* Academic Information Section */}
                <fieldset className={styles.section}>
                    <legend className={styles.sectionTitle}>Academic Information</legend>
                    <div className={styles.row}>
                        <DatePicker
                            name="enrollmentDate"
                            label="Enrollment Date"
                            value={formData.enrollmentDate}
                            onChange={handleChange}
                            error={errors.enrollmentDate}
                            required
                        />
                        <TextInput
                            name="course"
                            label="Course / Program"
                            value={formData.course}
                            onChange={handleChange}
                            error={errors.course}
                            required
                            placeholder="e.g., Bachelor of Science"
                        />
                    </div>
                    <div className={styles.row}>
                        <Select
                            name="department"
                            label="Department"
                            value={formData.department}
                            onChange={handleSelectChange}
                            error={errors.department}
                            options={[...DEPARTMENT_OPTIONS]}
                            required
                            placeholder="Select department"
                        />
                        <NumberInput
                            name="year"
                            label="Year"
                            value={formData.year}
                            onChange={handleChange}
                            error={errors.year}
                            required
                            min={1}
                            max={6}
                            placeholder="1-6"
                        />
                    </div>
                </fieldset>

                {/* Guardian Information Section (Optional) */}
                <fieldset className={styles.section}>
                    <legend className={styles.sectionTitle}>
                        Guardian Information
                        <span className={styles.optional}>(Optional)</span>
                    </legend>
                    <div className={styles.row}>
                        <TextInput
                            name="guardianName"
                            label="Guardian Name"
                            value={formData.guardianName}
                            onChange={handleChange}
                            error={errors.guardianName}
                            placeholder="Enter guardian's full name"
                        />
                        <TelInput
                            name="guardianPhone"
                            label="Guardian Phone"
                            value={formData.guardianPhone}
                            onChange={handleChange}
                            error={errors.guardianPhone}
                            placeholder="Enter guardian's phone"
                            countryCode="+91"
                            maxLength={10}
                        />
                    </div>
                </fieldset>

                {/* Form Actions */}
                <div className={styles.actions}>
                    <Button
                        type="button"
                        variant="outlined"
                        color="secondary"
                        onClick={handleReset}
                        disabled={isSubmitting}
                    >
                        Reset Form
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        loading={isSubmitting}
                    >
                        Register Student
                    </Button>
                </div>
            </form>
        </>
    );
};

export default StudentRegistrationForm;
