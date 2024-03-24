import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../config/app";
import mongoose from "mongoose";
import Product from "../models/entities/productModel";

const userId = new mongoose.Types.ObjectId().toString();

describe("product", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  describe("get product route", () => {
    describe("given the database is empty", () => {
      it("should return a 404", async () => {
        await supertest(app).get(`/api/products}`).expect(404);
      });
    });
  });

  describe("get product route", () => {
    describe("given the database is not empty", () => {
      it("should return a 200 status and the products", async () => {
        const productPayloads = [
          {
            id: 1,
            name: "Prodotto 1",
            image: "url_immagine_1",
            price: 10.99,
            availableQuantity: 50,
            category: "Categoria 1",
          },
          {
            id: 2,
            name: "Prodotto 2",
            image: "url_immagine_2",
            price: 5.99,
            availableQuantity: 100,
            category: "Categoria 2",
          },
        ];

        const products = await Product.create(productPayloads);

        const { body, statusCode } = await supertest(app).get(`/api/products`);

        expect(statusCode).toBe(200);

        expect(body).toHaveProperty("products");

        expect(body.products.length).toBeGreaterThan(0);

        //@ts-ignore
        body.products.forEach((responseProduct) => {
          const matchedProduct = products.find(
            (p) => p._id.toString() === responseProduct._id
          );

          expect(matchedProduct).toBeDefined();

          expect(responseProduct.name).toBe(matchedProduct?.name);
          expect(responseProduct.image).toBe(matchedProduct?.image);
          expect(responseProduct.price).toBe(matchedProduct?.price);
          expect(responseProduct.availableQuantity).toBe(
            matchedProduct?.availableQuantity
          );
          expect(responseProduct.category).toBe(matchedProduct?.category);
        });
      });
    });
  });
});
