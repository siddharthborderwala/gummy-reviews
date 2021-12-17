const supertest = require('supertest');

const app = require('../src/app');
const server = supertest(app);

describe('Test main GET endpoints', () => {
  let defaultProductId;

  it('GET /products/default/ should default product', async () => {
    const res = await server.get('/api/v1/products/default');
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('product');
    const product = res.body.product;
    expect(product).toHaveProperty('id');
    defaultProductId = product.id;
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('averageRating');
  });

  it('GET /products/:productId/reviews should show product reviews', async () => {
    const res = await server.get(
      `/api/v1/products/${defaultProductId}/reviews`
    );
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('reviews');
    expect(res.body.reviews).toBeDefined();
  });

  it('GET /reviews/product/:productId should show product reviews', async () => {
    const res = await server.get(`/api/v1/reviews/product/${defaultProductId}`);
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('reviews');
    expect(res.body.reviews).toBeDefined();
  });
});
