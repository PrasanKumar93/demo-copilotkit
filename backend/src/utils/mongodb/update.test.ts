import { describe, it, expect, afterAll, beforeAll, beforeEach } from "vitest";
import { z } from "zod";
import { connectDB, closeDB, getCollection } from "./connect.js";
import { updateOne } from "./update.js";

// Test schema
const TestDocSchema = z.object({
  _id: z.any().optional(),
  name: z.string(),
  email: z.string().email(),
  age: z.number().optional(),
});

type TestDoc = z.infer<typeof TestDocSchema>;

const TEST_COLLECTION = "test_update";

describe("MongoDB Update Utilities", () => {
  beforeAll(async () => {
    await connectDB();
  });

  beforeEach(async () => {
    // Clean and seed collection before each test
    const collection = getCollection(TEST_COLLECTION);
    await collection.deleteMany({});

    await collection.insertMany([
      { name: "Alice", email: "alice@example.com", age: 25 },
      { name: "Bob", email: "bob@example.com", age: 30 },
    ]);
  });

  afterAll(async () => {
    const collection = getCollection(TEST_COLLECTION);
    await collection.drop().catch(() => {});
    await closeDB();
  });

  describe("updateOne", () => {
    it("should update a document with partial data", async () => {
      const result = await updateOne<TestDoc>(
        TEST_COLLECTION,
        { name: "Alice" },
        { age: 26 },
        TestDocSchema
      );

      expect(result).toBeDefined();
      expect(result?.name).toBe("Alice");
      expect(result?.age).toBe(26);
    });

    it("should update using $set operator", async () => {
      const result = await updateOne<TestDoc>(
        TEST_COLLECTION,
        { name: "Bob" },
        { $set: { age: 31, name: "Bobby" } },
        TestDocSchema
      );

      expect(result).toBeDefined();
      expect(result?.name).toBe("Bobby");
      expect(result?.age).toBe(31);
    });

    it("should return the updated document", async () => {
      const result = await updateOne<TestDoc>(
        TEST_COLLECTION,
        { name: "Alice" },
        { email: "alice.updated@example.com" },
        TestDocSchema
      );

      expect(result?.email).toBe("alice.updated@example.com");
    });

    it("should return null when document not found", async () => {
      const result = await updateOne<TestDoc>(
        TEST_COLLECTION,
        { name: "NonExistent" },
        { age: 99 },
        TestDocSchema
      );

      expect(result).toBeNull();
    });

    it("should persist update to database", async () => {
      await updateOne<TestDoc>(
        TEST_COLLECTION,
        { name: "Alice" },
        { age: 100 },
        TestDocSchema
      );

      // Verify in database
      const collection = getCollection(TEST_COLLECTION);
      const found = await collection.findOne({ name: "Alice" });

      expect(found?.age).toBe(100);
    });

    it("should validate updated document with Zod", async () => {
      // Update that results in valid document should work
      const result = await updateOne<TestDoc>(
        TEST_COLLECTION,
        { name: "Alice" },
        { name: "Alice Updated" },
        TestDocSchema
      );

      expect(result?.name).toBe("Alice Updated");
    });
  });
});
