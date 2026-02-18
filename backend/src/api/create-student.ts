import { WithId } from "mongodb";
import { ZodType } from "zod";
import { createOne } from "../utils/mongodb/index.js";
import { StudentSchema, Student } from "../schemas/index.js";
import { COLLECTIONS } from "../constants/collections.js";

/**
 * Input type for creating a student (without auto-generated fields)
 */
type CreateStudentInput = Omit<Student, "_id" | "createdAt" | "updatedAt">;

/**
 * Creates a new student in the database
 * @param input - Student data from request body
 * @returns Created student document with _id
 */
const createStudent = async (
  input: CreateStudentInput
): Promise<WithId<Student>> => {
  const studentData: Student = {
    ...input,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await createOne<Student>(
    COLLECTIONS.STUDENTS,
    studentData,
    StudentSchema as ZodType<Student>
  );

  return result;
};

export { createStudent, CreateStudentInput };

