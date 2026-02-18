import { describe, it, expect } from "vitest";
import { StudentSchema } from "./student.schema.js";

describe("Zod Schemas", () => {
  describe("StudentSchema", () => {
    const validStudent = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@university.edu",
      dateOfBirth: new Date("2000-05-15"),
      studentId: "STU-2024-001",
      phone: "1234567890",
      address: {
        street: "123 University Ave",
        city: "Boston",
        state: "MA",
        zipCode: "02101",
        country: "USA",
      },
      enrollmentDate: new Date("2024-09-01"),
      course: "Computer Science",
      department: "Engineering",
      year: 1,
    };

    it("should validate a valid student", () => {
      const result = StudentSchema.safeParse(validStudent);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.firstName).toBe("John");
        expect(result.data.lastName).toBe("Doe");
        expect(result.data.email).toBe("john.doe@university.edu");
        expect(result.data.studentId).toBe("STU-2024-001");
      }
    });

    it("should validate student with optional fields", () => {
      const studentWithOptional = {
        ...validStudent,
        guardianName: "Jane Doe",
        guardianPhone: "0987654321",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = StudentSchema.safeParse(studentWithOptional);

      expect(result.success).toBe(true);
    });

    it("should use default country if not provided", () => {
      const studentWithoutCountry = {
        ...validStudent,
        address: {
          street: "123 University Ave",
          city: "Boston",
          state: "MA",
          zipCode: "02101",
        },
      };

      const result = StudentSchema.safeParse(studentWithoutCountry);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.address.country).toBe("USA");
      }
    });

    it("should reject empty first name", () => {
      const invalidStudent = {
        ...validStudent,
        firstName: "",
      };

      const result = StudentSchema.safeParse(invalidStudent);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe("First name is required");
      }
    });

    it("should reject invalid email", () => {
      const invalidStudent = {
        ...validStudent,
        email: "not-an-email",
      };

      const result = StudentSchema.safeParse(invalidStudent);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe("Invalid email format");
      }
    });

    it("should reject invalid year", () => {
      const invalidStudent = {
        ...validStudent,
        year: 7,
      };

      const result = StudentSchema.safeParse(invalidStudent);

      expect(result.success).toBe(false);
    });

    it("should reject short phone number", () => {
      const invalidStudent = {
        ...validStudent,
        phone: "12345",
      };

      const result = StudentSchema.safeParse(invalidStudent);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe(
          "Phone number must be at least 10 digits"
        );
      }
    });

    it("should reject missing required fields", () => {
      const invalidStudent = {
        firstName: "John",
        lastName: "Doe",
      };

      const result = StudentSchema.safeParse(invalidStudent);

      expect(result.success).toBe(false);
    });
  });
});
