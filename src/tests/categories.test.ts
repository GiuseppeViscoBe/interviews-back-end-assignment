import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../config/app";
import Product from "../models/entities/productModel";
import supertest from "supertest";
import { setupTestDatabase, teardownTestDatabase } from "./utils/testUtils";

describe("getCategoriesNameAndNumber", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    await setupTestDatabase();
  });

  afterAll(async () => {
    await teardownTestDatabase();
  });

  beforeEach(async () => {
    await Product.deleteMany({});
  });

  describe("given there are categories in the database", () => {
    it("should return categories name and number of products per category", async () => {
      const categoriesPayload = [
        {
          id: 1,
          name: "Tatiera",
          image: "url_tastiera",
          price: 10.99,
          availableQuantity: 50,
          category: "tecnologia",
        },
        {
          id: 2,
          name: "Mouse",
          image: "url_mouse",
          price: 5.99,
          availableQuantity: 100,
          category: "tecnologia",
        },
        {
          id: 1,
          name: "Padella",
          image: "url_padella",
          price: 10.99,
          availableQuantity: 50,
          category: "Cucina",
        },
        {
          id: 2,
          name: "Spatola",
          image: "url_Spatola",
          price: 5.99,
          availableQuantity: 100,
          category: "Cucina",
        },
        {
          id: 1,
          name: "Quaderno",
          image: "url_quaderno",
          price: 10.99,
          availableQuantity: 50,
          category: "cancelleria",
        },
      ];

      const products = await Product.create(categoriesPayload);
      const response = await supertest(app).get(
        "/api/getCategoriesNameAndNumber"
      );

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(3);
      expect(response.body).toContainEqual({
        categoryName: "tecnologia",
        productCount: 2,
      });
      expect(response.body).toContainEqual({
        categoryName: "Cucina",
        productCount: 2,
      });
      expect(response.body).toContainEqual({
        categoryName: "cancelleria",
        productCount: 1,
      });
    });
  });

  describe("given there are no categories in the database", () => {
    it("should return 404", async () => {
      const response = await supertest(app).get(
        "/api/getCategoriesNameAndNumber"
      );

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        message: "No categories found in the database",
      });
    });
  });
});
