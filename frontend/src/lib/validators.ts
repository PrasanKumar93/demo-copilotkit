import { z } from "zod";

// Address schema
const AddressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(5, "Zip code is required"),
  country: z.string().default("USA"),
});

// Student schema - mirrors backend
const StudentSchema = z.object({
  _id: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  dateOfBirth: z.coerce.date(),
  studentId: z.string().min(1, "Student ID is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: AddressSchema,
  enrollmentDate: z.coerce.date(),
  course: z.string().min(1, "Course is required"),
  department: z.string().min(1, "Department is required"),
  year: z.number().int().min(1).max(6),
  guardianName: z.string().optional(),
  guardianPhone: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

// Schema for creating a new student (without auto-generated fields)
const CreateStudentSchema = StudentSchema.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
});

// Infer types from schemas (single source of truth)
type Student = z.infer<typeof StudentSchema>;
type CreateStudentInput = z.infer<typeof CreateStudentSchema>;
type StudentAddress = z.infer<typeof AddressSchema>;

// Validation helper function
const validateStudent = (data: unknown) => {
  return StudentSchema.safeParse(data);
};

const validateCreateStudent = (data: unknown) => {
  return CreateStudentSchema.safeParse(data);
};

export {
  AddressSchema,
  StudentSchema,
  CreateStudentSchema,
  validateStudent,
  validateCreateStudent,
};

export type { Student, CreateStudentInput, StudentAddress };
