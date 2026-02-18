import { describe, it, expect, afterAll, beforeAll, beforeEach } from "vitest";
import { connectDB, closeDB, getCollection } from "./connect.js";
import { deleteOne, deleteMany } from "./delete.js";

const TEST_COLLECTION = "test_delete";

describe("MongoDB Delete Utilities", () => {
  beforeAll(async () => {
    await connectDB();
  });

  beforeEach(async () => {
    // Clean and seed collection before each test
    const collection = getCollection(TEST_COLLECTION);
    await collection.deleteMany({});

    await collection.insertMany([
      { name: "Alice", email: "alice@example.com", category: "A" },
      { name: "Bob", email: "bob@example.com", category: "A" },
      { name: "Charlie", email: "charlie@example.com", category: "B" },
      { name: "Diana", email: "diana@example.com", category: "B" },
    ]);
  });

  afterAll(async () => {
    const collection = getCollection(TEST_COLLECTION);
    await collection.drop().catch(() => {});
    await closeDB();
  });

  describe("deleteOne", () => {
    it("should delete a document and return true", async () => {
      const result = await deleteOne(TEST_COLLECTION, { name: "Alice" });

      expect(result).toBe(true);
    });

    it("should actually remove document from database", async () => {
      await deleteOne(TEST_COLLECTION, { name: "Alice" });

      const collection = getCollection(TEST_COLLECTION);
      const found = await collection.findOne({ name: "Alice" });

      expect(found).toBeNull();
    });

    it("should return false when document not found", async () => {
      const result = await deleteOne(TEST_COLLECTION, { name: "NonExistent" });

      expect(result).toBe(false);
    });

    it("should only delete one document even if multiple match", async () => {
      await deleteOne(TEST_COLLECTION, { category: "A" });

      const collection = getCollection(TEST_COLLECTION);
      const count = await collection.countDocuments({ category: "A" });

      // Should have deleted only one of the two category A documents
      expect(count).toBe(1);
    });
  });

  describe("deleteMany", () => {
    it("should delete multiple documents and return count", async () => {
      const result = await deleteMany(TEST_COLLECTION, { category: "A" });

      expect(result).toBe(2);
    });

    it("should actually remove all matching documents from database", async () => {
      await deleteMany(TEST_COLLECTION, { category: "B" });

      const collection = getCollection(TEST_COLLECTION);
      const count = await collection.countDocuments({ category: "B" });

      expect(count).toBe(0);
    });

    it("should return 0 when no documents match", async () => {
      const result = await deleteMany(TEST_COLLECTION, { name: "NonExistent" });

      expect(result).toBe(0);
    });

    it("should delete all documents with empty query", async () => {
      const result = await deleteMany(TEST_COLLECTION, {});

      expect(result).toBe(4);

      const collection = getCollection(TEST_COLLECTION);
      const count = await collection.countDocuments({});
      expect(count).toBe(0);
    });
  });
});
