"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../config/app"));
const product_model_1 = __importDefault(require("../models/entities/product.model"));
const testUtils_1 = require("./utils/testUtils");
describe("product", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, testUtils_1.setupTestDatabase)();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, testUtils_1.teardownTestDatabase)();
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield product_model_1.default.deleteMany({});
    }));
    describe("get products route", () => {
        describe("given the database is empty", () => {
            it("should return a 404", () => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, supertest_1.default)(app_1.default).get(`/api/getAllProducts}`).expect(404);
            }));
        });
    });
    describe("get products route", () => {
        describe("given the database is not empty", () => {
            it("should return a 200 status and the products", () => __awaiter(void 0, void 0, void 0, function* () {
                const productPayloads = [
                    {
                        id: 1,
                        name: "Prodotto 1",
                        image: "url_immagine_1",
                        price: 10.99,
                        quantity: 50,
                        category: "Categoria 1",
                        extraPoints: 2
                    },
                    {
                        id: 2,
                        name: "Prodotto 2",
                        image: "url_immagine_2",
                        price: 5.99,
                        quantity: 100,
                        category: "Categoria 2",
                        extraPoints: 2
                    },
                ];
                const products = yield product_model_1.default.create(productPayloads);
                const { body, statusCode } = yield (0, supertest_1.default)(app_1.default).get(`/api/getAllProducts`);
                expect(statusCode).toBe(200);
                expect(body).toHaveProperty("products");
                expect(body.products.length).toBeGreaterThan(0);
                //@ts-ignore
                body.products.forEach((responseProduct) => {
                    const matchedProduct = products.find((p) => p._id.toString() === responseProduct._id);
                    expect(matchedProduct).toBeDefined();
                    expect(responseProduct.name).toBe(matchedProduct === null || matchedProduct === void 0 ? void 0 : matchedProduct.name);
                    expect(responseProduct.image).toBe(matchedProduct === null || matchedProduct === void 0 ? void 0 : matchedProduct.image);
                    expect(responseProduct.price).toBe(matchedProduct === null || matchedProduct === void 0 ? void 0 : matchedProduct.price);
                    expect(responseProduct.quantity).toBe(matchedProduct === null || matchedProduct === void 0 ? void 0 : matchedProduct.quantity);
                    expect(responseProduct.category).toBe(matchedProduct === null || matchedProduct === void 0 ? void 0 : matchedProduct.category);
                });
            }));
        });
    });
    describe("getProductsByNameAndOrCategory route", () => {
        describe("given the database is not empty and both name and category are provided", () => {
            it("should return a 200 status and the matching products", () => __awaiter(void 0, void 0, void 0, function* () {
                const productPayloads = [
                    {
                        id: 1,
                        name: "Prodotto 1",
                        image: "url_immagine_1",
                        price: 10.99,
                        quantity: 50,
                        category: "Categoria 1",
                        extraPoints: 2
                    },
                    {
                        id: 2,
                        name: "Prodotto 2",
                        image: "url_immagine_2",
                        price: 5.99,
                        quantity: 100,
                        category: "Categoria 2",
                        extraPoints: 2
                    },
                    {
                        id: 1,
                        name: "Prodotto 1",
                        image: "url_immagine_1",
                        price: 10.99,
                        quantity: 50,
                        category: "Categoria 1",
                        extraPoints: 2
                    },
                ];
                yield product_model_1.default.create(productPayloads);
                const productName = "Prodotto 1";
                const categoryName = "Categoria 1";
                const { body, statusCode } = yield (0, supertest_1.default)(app_1.default).get(`/api/getProductsByNameAndOrCategory?pName=${productName}&cName=${categoryName}`);
                expect(statusCode).toBe(200);
                expect(body).toHaveProperty("products");
                expect(body.products.length).toBeGreaterThan(0);
                body.products.forEach((responseProduct) => {
                    expect(responseProduct.name).toBe(productName);
                    expect(responseProduct.category).toBe(categoryName);
                });
            }));
        });
        describe("given the database is not empty and only name is provided", () => {
            it("should return a 200 status and the matching products", () => __awaiter(void 0, void 0, void 0, function* () {
                const productPayloads = [
                    {
                        id: 1,
                        name: "Prodotto 1",
                        image: "url_immagine_1",
                        price: 10.99,
                        quantity: 50,
                        category: "Categoria 1",
                        extraPoints: 2
                    },
                    {
                        id: 2,
                        name: "Prodotto 2",
                        image: "url_immagine_2",
                        price: 5.99,
                        quantity: 100,
                        category: "Categoria 2",
                        extraPoints: 2
                    },
                ];
                yield product_model_1.default.create(productPayloads);
                const productName = "Prodotto 1";
                const { body, statusCode } = yield (0, supertest_1.default)(app_1.default).get(`/api/getProductsByNameAndOrCategory?pName=${productName}`);
                expect(statusCode).toBe(200);
                expect(body).toHaveProperty("products");
                expect(body.products.length).toBeGreaterThan(0);
                body.products.forEach((responseProduct) => {
                    expect(responseProduct.name).toBe(productName);
                });
            }));
        });
        describe("given the database is not empty and only category is provided", () => {
            it("should return a 200 status and the matching products", () => __awaiter(void 0, void 0, void 0, function* () {
                const productPayloads = [
                    {
                        id: 1,
                        name: "Prodotto 1",
                        image: "url_immagine_1",
                        price: 10.99,
                        quantity: 50,
                        category: "Categoria 1",
                        extraPoints: 2
                    },
                    {
                        id: 2,
                        name: "Prodotto 2",
                        image: "url_immagine_2",
                        price: 5.99,
                        quantity: 100,
                        category: "Categoria 2",
                        extraPoints: 2
                    },
                ];
                yield product_model_1.default.create(productPayloads);
                const categoryName = "Categoria 1";
                const { body, statusCode } = yield (0, supertest_1.default)(app_1.default).get(`/api/getProductsByNameAndOrCategory?cName=${categoryName}`);
                expect(statusCode).toBe(200);
                expect(body).toHaveProperty("products");
                expect(body.products.length).toBeGreaterThan(0);
                body.products.forEach((responseProduct) => {
                    expect(responseProduct.category).toBe(categoryName);
                });
            }));
        });
    });
});
