import { z } from "zod";

// Generic MongoDB document schema
const MongoDocumentSchema = z.object({
  _id: z.any().optional(),
});

type MongoDocument = z.infer<typeof MongoDocumentSchema>;

export { MongoDocumentSchema };
export type { MongoDocument };
