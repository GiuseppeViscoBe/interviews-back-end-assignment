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
const mongodb_memory_server_1 = require("mongodb-memory-server");
const app_1 = __importDefault(require("../config/app"));
const mongoose_1 = __importDefault(require("mongoose"));
const productModel_1 = __importDefault(require("../models/entities/productModel"));
const userId = new mongoose_1.default.Types.ObjectId().toString();
describe("product", () => {
    let mongoServer;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        yield mongoose_1.default.connect(mongoUri);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
        yield mongoServer.stop();
    }));
    describe("get product route", () => {
        describe("given the database is empty", () => {
            it("should return a 404", () => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, supertest_1.default)(app_1.default).get(`/api/products}`).expect(404);
            }));
        });
    });
    describe("get product route", () => {
        describe("given the database is not empty", () => {
            it("should return a 200 status and the products", () => __awaiter(void 0, void 0, void 0, function* () {
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
                const products = yield productModel_1.default.create(productPayloads);
                const { body, statusCode } = yield (0, supertest_1.default)(app_1.default).get(`/api/products`);
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
                    expect(responseProduct.availableQuantity).toBe(matchedProduct === null || matchedProduct === void 0 ? void 0 : matchedProduct.availableQuantity);
                    expect(responseProduct.category).toBe(matchedProduct === null || matchedProduct === void 0 ? void 0 : matchedProduct.category);
                });
            }));
        });
    });
});
