const request = require('supertest');
const app = require('../app');

describe('App', () => {
  it('should return 404 for a non-existent route', async () => {
    const res = await request(app).get('/api/nonexistent');
    expect(res.statusCode).toEqual(404);
  });
});
