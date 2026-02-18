import { describe, it, expect, afterAll, beforeAll } from "vitest";
import {
  connectDB,
  getDB,
  getCollection,
  closeDB,
  isConnected,
} from "./connect.js";

describe("MongoDB Connect Utilities", () => {
  beforeAll(async () => {
    // Ensure we start with a clean connection
    await closeDB();
  });

  afterAll(async () => {
    // Clean up connection after all tests
    await closeDB();
  });

  describe("connectDB", () => {
    it("should connect to MongoDB successfully", async () => {
      const db = await connectDB();

      expect(db).toBeDefined();
      expect(isConnected()).toBe(true);
    });

    it("should return existing connection if already connected", async () => {
      const db1 = await connectDB();
      const db2 = await connectDB();

      expect(db1).toBe(db2);
    });
  });

  describe("getDB", () => {
    it("should return the database instance when connected", async () => {
      await connectDB();
      const db = getDB();

      expect(db).toBeDefined();
    });

    it("should throw error when not connected", async () => {
      await closeDB();

      expect(() => getDB()).toThrow("Database not connected");
    });
  });

  describe("getCollection", () => {
    it("should return a typed collection", async () => {
      await connectDB();
      const collection = getCollection("test_collection");

      expect(collection).toBeDefined();
      expect(collection.collectionName).toBe("test_collection");
    });
  });

  describe("isConnected", () => {
    it("should return true when connected", async () => {
      await connectDB();

      expect(isConnected()).toBe(true);
    });

    it("should return false when disconnected", async () => {
      await closeDB();

      expect(isConnected()).toBe(false);
    });
  });

  describe("closeDB", () => {
    it("should close the connection", async () => {
      await connectDB();
      expect(isConnected()).toBe(true);

      await closeDB();
      expect(isConnected()).toBe(false);
    });

    it("should handle multiple close calls gracefully", async () => {
      await closeDB();
      await closeDB();

      expect(isConnected()).toBe(false);
    });
  });
});
