"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const productsService = __importStar(require("../services/cart.service"));
jest.mock('../services/cart.service');
describe('Cart Controller', () => {
    describe('addProductsToCartHandler', () => {
        it('should add a product to the cart and return success message', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockProductId = 'mockProductId';
            const mockQuantity = 1;
            const mockProduct = {
                _id: '66027650e3db8c0bb8ff2b75',
                product: {
                    _id: '660159534ed8c5c94d19f7b4',
                    id: 1,
                    name: 'Prodotto 1',
                    image: 'url_immagine_1',
                    price: 10.99,
                    quantity: 20,
                    category: 'Categoria 1'
                },
                __v: 0
            };
            const addProductToCartMock = jest.spyOn(productsService, 'addProductToCart');
            //@ts-ignore
            addProductToCartMock.mockResolvedValueOnce({ product: mockProduct });
            const response = yield (0, supertest_1.default)(app_1.default)
                .post('/api/addProductsToCart')
                .send({ productId: mockProductId, quantity: mockQuantity });
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'Product added to cart successfully' });
        }));
        it('should handle the case where no product is found in the database', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockProductId = 'mockProductId';
            const mockQuantity = 1;
            const addProductToCartMock = jest.spyOn(productsService, 'addProductToCart');
            addProductToCartMock.mockResolvedValueOnce({ product: null });
            const response = yield (0, supertest_1.default)(app_1.default)
                .post('/api/addProductsToCart')
                .send({ productId: mockProductId, quantity: mockQuantity });
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'No products found in the database' });
        }));
    });
    describe('getCartHandler', () => {
        it('should get the cart and return its contents', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockCart = [
                {
                    _id: '66027650e3db8c0bb8ff2b75',
                    product: {
                        _id: '660159534ed8c5c94d19f7b4',
                        id: 1,
                        name: 'Prodotto 1',
                        image: 'url_immagine_1',
                        price: 10.99,
                        quantity: 20,
                        category: 'Categoria 1'
                    },
                    __v: 0
                }
            ];
            ;
            const getCartMock = jest.spyOn(productsService, 'getCart');
            //@ts-ignore
            getCartMock.mockResolvedValueOnce(mockCart);
            const response = yield (0, supertest_1.default)(app_1.default).get('/api/GetCart');
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ cart: mockCart });
        }));
        it('should handle the case where no products are found in the cart', () => __awaiter(void 0, void 0, void 0, function* () {
            const getCartMock = jest.spyOn(productsService, 'getCart');
            getCartMock.mockResolvedValueOnce(null);
            const response = yield (0, supertest_1.default)(app_1.default).get('/api/GetCart');
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'No products found in the cart' });
        }));
    });
});
