import { Document, Filter, WithId as MongoWithId } from "mongodb";
import { ZodSchema } from "zod";
import { getCollection } from "./connect.js";

/**
 * Find one document with Zod validation
 */
const findOne = async <T extends Document>(
  collectionName: string,
  query: Filter<T>,
  schema: ZodSchema<T>
): Promise<MongoWithId<T> | null> => {
  const collection = getCollection<T>(collectionName);
  const doc = await collection.findOne(query);

  if (!doc) {
    return null;
  }

  // Validate output data
  const validated = schema.parse(doc);
  return validated as MongoWithId<T>;
};

/**
 * Find many documents with Zod validation
 */
const findMany = async <T extends Document>(
  collectionName: string,
  query: Filter<T>,
  schema: ZodSchema<T>,
  options?: { limit?: number; skip?: number; sort?: Record<string, 1 | -1> }
): Promise<MongoWithId<T>[]> => {
  const collection = getCollection<T>(collectionName);

  let cursor = collection.find(query);

  if (options?.sort) {
    cursor = cursor.sort(options.sort);
  }
  if (options?.skip) {
    cursor = cursor.skip(options.skip);
  }
  if (options?.limit) {
    cursor = cursor.limit(options.limit);
  }

  const docs = await cursor.toArray();

  // Validate each document
  return docs.map((doc) => schema.parse(doc) as MongoWithId<T>);
};

/**
 * Count documents
 */
const countDocuments = async <T extends Document>(
  collectionName: string,
  query: Filter<T> = {} as Filter<T>
): Promise<number> => {
  const collection = getCollection<T>(collectionName);
  return collection.countDocuments(query);
};

export { findOne, findMany, countDocuments };
