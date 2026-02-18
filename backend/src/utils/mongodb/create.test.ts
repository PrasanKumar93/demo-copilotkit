import { describe, it, expect, afterAll, beforeAll, beforeEach } from "vitest";
import { z } from "zod";
import { connectDB, closeDB, getCollection } from "./connect.js";
import { createOne } from "./create.js";

// Test schema
const TestDocSchema = z.object({
  _id: z.any().optional(),
  name: z.string(),
  email: z.string().email(),
  age: z.number().optional(),
});

type TestDoc = z.infer<typeof TestDocSchema>;

const TEST_COLLECTION = "test_create";

describe("MongoDB Create Utilities", () => {
  beforeAll(async () => {
    await connectDB();
  });

  beforeEach(async () => {
    // Clean collection before each test
    const collection = getCollection(TEST_COLLECTION);
    await collection.deleteMany({});
  });

  afterAll(async () => {
    // Clean up test collection
    const collection = getCollection(TEST_COLLECTION);
    await collection.drop().catch(() => {}); // Ignore error if collection doesn't exist
    await closeDB();
  });

  describe("createOne", () => {
    it("should create a document successfully", async () => {
      const data = { name: "John Doe", email: "john@example.com" };

      const result = await createOne<TestDoc>(
        TEST_COLLECTION,
        data,
        TestDocSchema
      );

      expect(result).toBeDefined();
      expect(result._id).toBeDefined();
      expect(result.name).toBe("John Doe");
      expect(result.email).toBe("john@example.com");
    });

    it("should create document with optional fields", async () => {
      const data = { name: "Jane Doe", email: "jane@example.com", age: 25 };

      const result = await createOne<TestDoc>(
        TEST_COLLECTION,
        data,
        TestDocSchema
      );

      expect(result.age).toBe(25);
    });

    it("should persist document to database", async () => {
      const data = { name: "Persist Test", email: "persist@example.com" };

      const created = await createOne<TestDoc>(
        TEST_COLLECTION,
        data,
        TestDocSchema
      );

      // Verify it's in the database
      const collection = getCollection(TEST_COLLECTION);
      const found = await collection.findOne({ _id: created._id });

      expect(found).toBeDefined();
      expect(found?.name).toBe("Persist Test");
    });

    it("should throw error for invalid data (Zod validation)", async () => {
      const invalidData = { name: "Test", email: "not-an-email" };

      await expect(
        createOne<TestDoc>(TEST_COLLECTION, invalidData as any, TestDocSchema)
      ).rejects.toThrow();
    });

    it("should throw error for missing required fields", async () => {
      const invalidData = { name: "Test" }; // missing email

      await expect(
        createOne<TestDoc>(TEST_COLLECTION, invalidData as any, TestDocSchema)
      ).rejects.toThrow();
    });
  });
});
