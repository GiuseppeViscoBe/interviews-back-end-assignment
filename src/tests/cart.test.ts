import supertest from 'supertest';
import app from '../config/app';
import * as productsService from '../services/cart.service';
import { setupTestDatabase, teardownTestDatabase } from './utils/testUtils';
import { mockProduct, mockCart } from './utils/mockDataCart'; 

jest.mock('../services/cart.service');

describe('Cart Controller', () => {
  beforeAll(async () => {
    await setupTestDatabase(); 
  });

  afterAll(async () => {
    await teardownTestDatabase(); 
  });

  describe('addProductsToCartHandler', () => {
    it('should add a product to the cart and return success message', async () => {
      (productsService.addProductToCart as jest.Mock).mockResolvedValueOnce({ product: mockProduct });

      const response = await supertest(app)
        .post('/api/addProductsToCart')
        .send({ productId: 'mockProductId', quantity: 1 });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Product added to cart successfully' });
    });

    it('should handle the case where no product is found in the database', async () => {
      (productsService.addProductToCart as jest.Mock).mockResolvedValueOnce({ product: null });

      const response = await supertest(app)
        .post('/api/addProductsToCart')
        .send({ productId: 'mockProductId', quantity: 1 });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: `No products found with this id : mockProductId`  });
    });
  });

  describe('getCartHandler', () => {
    it('should get the cart and return its contents', async () => {
      (productsService.getCart as jest.Mock).mockResolvedValueOnce(mockCart);

      const response = await supertest(app).get('/api/GetCart');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ cart: mockCart });
    });

    it('should handle the case where no products are found in the cart', async () => {
      (productsService.getCart as jest.Mock).mockResolvedValueOnce(null);

      const response = await supertest(app).get('/api/GetCart');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'No products found in the cart' });
    });
  });
});