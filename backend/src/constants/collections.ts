/**
 * MongoDB collection names
 */
const COLLECTIONS = {
  STUDENTS: "students",
} as const;

type CollectionName = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];

export { COLLECTIONS, CollectionName };
