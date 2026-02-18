import { WithId } from "mongodb";
import { ZodType } from "zod";
import { findMany } from "../utils/mongodb/index.js";
import { StudentSchema, Student } from "../schemas/index.js";
import { COLLECTIONS } from "../constants/collections.js";

/**
 * Retrieves all students from the database
 * @returns Array of all student documents
 */
const getAllStudents = async (): Promise<WithId<Student>[]> => {
  const students = await findMany<Student>(
    COLLECTIONS.STUDENTS,
    {},
    StudentSchema as ZodType<Student>,
    { sort: { createdAt: -1 } }
  );

  return students;
};

export { getAllStudents };
