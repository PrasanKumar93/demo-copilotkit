import {
  Document,
  OptionalUnlessRequiredId,
  WithId as MongoWithId,
} from "mongodb";
import { ZodSchema } from "zod";
import { getCollection } from "./connect.js";

/**
 * Create a document with Zod validation
 */
const createOne = async <T extends Document>(
  collectionName: string,
  data: OptionalUnlessRequiredId<T>,
  schema: ZodSchema<T>
): Promise<MongoWithId<T>> => {
  // Validate input data
  const validated = schema.parse(data);

  const collection = getCollection<T>(collectionName);
  const result = await collection.insertOne(
    validated as OptionalUnlessRequiredId<T>
  );

  return { ...validated, _id: result.insertedId } as MongoWithId<T>;
};

export { createOne };
