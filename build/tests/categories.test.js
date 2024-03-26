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
const app_1 = __importDefault(require("../config/app"));
const product_model_1 = __importDefault(require("../models/entities/product.model"));
const supertest_1 = __importDefault(require("supertest"));
const testUtils_1 = require("./utils/testUtils");
describe("getCategoriesNameAndNumber", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, testUtils_1.setupTestDatabase)();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, testUtils_1.teardownTestDatabase)();
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield product_model_1.default.deleteMany({});
    }));
    describe("given there are categories in the database", () => {
        it("should return categories name and number of products per category", () => __awaiter(void 0, void 0, void 0, function* () {
            const categoriesPayload = [
                {
                    id: 1,
                    name: "Tatiera",
                    image: "url_tastiera",
                    price: 10.99,
                    quantity: 50,
                    category: "tecnologia",
                },
                {
                    id: 2,
                    name: "Mouse",
                    image: "url_mouse",
                    price: 5.99,
                    quantity: 100,
                    category: "tecnologia",
                },
                {
                    id: 1,
                    name: "Padella",
                    image: "url_padella",
                    price: 10.99,
                    quantity: 50,
                    category: "Cucina",
                },
                {
                    id: 2,
                    name: "Spatola",
                    image: "url_Spatola",
                    price: 5.99,
                    quantity: 100,
                    category: "Cucina",
                },
                {
                    id: 1,
                    name: "Quaderno",
                    image: "url_quaderno",
                    price: 10.99,
                    quantity: 50,
                    category: "cancelleria",
                },
            ];
            const products = yield product_model_1.default.create(categoriesPayload);
            const response = yield (0, supertest_1.default)(app_1.default).get("/api/getCategoriesNameAndNumber");
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
        }));
    });
    describe("given there are no categories in the database", () => {
        it("should return 404", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).get("/api/getCategoriesNameAndNumber");
            expect(response.status).toBe(404);
            expect(response.body).toEqual({
                message: "No categories found in the database",
            });
        }));
    });
});
