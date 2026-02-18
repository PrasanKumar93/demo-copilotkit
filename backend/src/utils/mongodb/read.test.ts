import { describe, it, expect, afterAll, beforeAll, beforeEach } from "vitest";
import { z } from "zod";
import { connectDB, closeDB, getCollection } from "./connect.js";
import { findOne, findMany, countDocuments } from "./read.js";

// Test schema
const TestDocSchema = z.object({
  _id: z.any().optional(),
  name: z.string(),
  email: z.string().email(),
  age: z.number().optional(),
});

type TestDoc = z.infer<typeof TestDocSchema>;

const TEST_COLLECTION = "test_read";

describe("MongoDB Read Utilities", () => {
  beforeAll(async () => {
    await connectDB();
  });

  beforeEach(async () => {
    // Clean and seed collection before each test
    const collection = getCollection(TEST_COLLECTION);
    await collection.deleteMany({});

    // Seed test data
    await collection.insertMany([
      { name: "Alice", email: "alice@example.com", age: 25 },
      { name: "Bob", email: "bob@example.com", age: 30 },
      { name: "Charlie", email: "charlie@example.com", age: 35 },
      { name: "Diana", email: "diana@example.com", age: 28 },
    ]);
  });

  afterAll(async () => {
    const collection = getCollection(TEST_COLLECTION);
    await collection.drop().catch(() => {});
    await closeDB();
  });

  describe("findOne", () => {
    it("should find a document by query", async () => {
      const result = await findOne<TestDoc>(
        TEST_COLLECTION,
        { name: "Alice" },
        TestDocSchema
      );

      expect(result).toBeDefined();
      expect(result?.name).toBe("Alice");
      expect(result?.email).toBe("alice@example.com");
    });

    it("should return null when document not found", async () => {
      const result = await findOne<TestDoc>(
        TEST_COLLECTION,
        { name: "NonExistent" },
        TestDocSchema
      );

      expect(result).toBeNull();
    });

    it("should find by multiple criteria", async () => {
      const result = await findOne<TestDoc>(
        TEST_COLLECTION,
        { name: "Bob", age: 30 },
        TestDocSchema
      );

      expect(result).toBeDefined();
      expect(result?.name).toBe("Bob");
    });
  });

  describe("findMany", () => {
    it("should find all documents matching query", async () => {
      const results = await findMany<TestDoc>(
        TEST_COLLECTION,
        {},
        TestDocSchema
      );

      expect(results).toHaveLength(4);
    });

    it("should find documents with filter", async () => {
      const results = await findMany<TestDoc>(
        TEST_COLLECTION,
        { age: { $gte: 30 } },
        TestDocSchema
      );

      expect(results).toHaveLength(2);
      expect(results.every((doc) => (doc.age ?? 0) >= 30)).toBe(true);
    });

    it("should respect limit option", async () => {
      const results = await findMany<TestDoc>(
        TEST_COLLECTION,
        {},
        TestDocSchema,
        { limit: 2 }
      );

      expect(results).toHaveLength(2);
    });

    it("should respect skip option", async () => {
      const allResults = await findMany<TestDoc>(
        TEST_COLLECTION,
        {},
        TestDocSchema,
        { sort: { name: 1 } }
      );

      const skippedResults = await findMany<TestDoc>(
        TEST_COLLECTION,
        {},
        TestDocSchema,
        { skip: 2, sort: { name: 1 } }
      );

      expect(skippedResults).toHaveLength(2);
      expect(skippedResults[0]?.name).toBe(allResults[2]?.name);
    });

    it("should respect sort option (ascending)", async () => {
      const results = await findMany<TestDoc>(
        TEST_COLLECTION,
        {},
        TestDocSchema,
        { sort: { age: 1 } }
      );

      expect(results[0]?.age).toBe(25);
      expect(results[results.length - 1]?.age).toBe(35);
    });

    it("should respect sort option (descending)", async () => {
      const results = await findMany<TestDoc>(
        TEST_COLLECTION,
        {},
        TestDocSchema,
        { sort: { age: -1 } }
      );

      expect(results[0]?.age).toBe(35);
      expect(results[results.length - 1]?.age).toBe(25);
    });

    it("should return empty array when no matches", async () => {
      const results = await findMany<TestDoc>(
        TEST_COLLECTION,
        { name: "NonExistent" },
        TestDocSchema
      );

      expect(results).toHaveLength(0);
    });
  });

  describe("countDocuments", () => {
    it("should count all documents", async () => {
      const count = await countDocuments(TEST_COLLECTION);

      expect(count).toBe(4);
    });

    it("should count documents matching query", async () => {
      const count = await countDocuments(TEST_COLLECTION, {
        age: { $gte: 30 },
      });

      expect(count).toBe(2);
    });

    it("should return 0 for no matches", async () => {
      const count = await countDocuments(TEST_COLLECTION, {
        name: "NonExistent",
      });

      expect(count).toBe(0);
    });
  });
});
