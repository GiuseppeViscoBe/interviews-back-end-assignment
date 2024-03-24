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

  describe("get products route", () => {
    describe("given the database is empty", () => {
      it("should return a 404", async () => {
        await supertest(app).get(`/api/getProducts}`).expect(404);
      });
    });
  });

  describe("get products route", () => {
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

        const { body, statusCode } = await supertest(app).get(`/api/getProducts`);

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

  describe("getProductsByNameAndOrCategory route", () => {
    describe("given the database is not empty and both name and category are provided", () => {
      it("should return a 200 status and the matching products", async () => {
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
          {
            id: 1,
            name: "Prodotto 1",
            image: "url_immagine_1",
            price: 10.99,
            availableQuantity: 50,
            category: "Categoria 1",
          },
        ];
  
        await Product.create(productPayloads);
  
        const productName = "Prodotto 1";
        const categoryName = "Categoria 1";
  
        const { body, statusCode } = await supertest(app).get(`/api/getProductsByNameAndOrCategory?pName=${productName}&cName=${categoryName}`);
  
        expect(statusCode).toBe(200);
  
        expect(body).toHaveProperty("products");
  
        expect(body.products.length).toBeGreaterThan(0);
  
        body.products.forEach((responseProduct : IProduct) => {
          expect(responseProduct.name).toBe(productName);
          expect(responseProduct.category).toBe(categoryName);
        });
      });
    });
  
    describe("given the database is not empty and only name is provided", () => {
      it("should return a 200 status and the matching products", async () => {
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
  
        await Product.create(productPayloads);
  
        const productName = "Prodotto 1";
  
        const { body, statusCode } = await supertest(app).get(`/api/getProductsByNameAndOrCategory?pName=${productName}`);
  
        expect(statusCode).toBe(200);
  
        expect(body).toHaveProperty("products");
  
        expect(body.products.length).toBeGreaterThan(0);
  
        body.products.forEach((responseProduct : IProduct) => {
          expect(responseProduct.name).toBe(productName);
        });
      });
    });
  
    describe("given the database is not empty and only category is provided", () => {
      it("should return a 200 status and the matching products", async () => {
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
  
        await Product.create(productPayloads);
  
        const categoryName = "Categoria 1";
  
        const { body, statusCode } = await supertest(app).get(`/api/getProductsByNameAndOrCategory?cName=${categoryName}`);
  
        expect(statusCode).toBe(200);
  
        expect(body).toHaveProperty("products");
  
        expect(body.products.length).toBeGreaterThan(0);
  
        body.products.forEach((responseProduct : IProduct) => {
          expect(responseProduct.category).toBe(categoryName);
        });
      });
    });
  });
  
  
});
