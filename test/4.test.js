const app = require('../app');
const request = require('supertest');
const cls = require('cls-hooked');

describe('api test', () => {
  afterAll(() => {
    cls.destroyNamespace('_test_ns_');
  });
  for(let i = 0; i < 20; i++) {
    it(`test ${i}`, async () => {
      const res = await request(app.callback())
        .get('/');
      expect(res.status).toBe(200);
    });
  }
});