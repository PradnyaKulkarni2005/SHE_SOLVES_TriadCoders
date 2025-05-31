const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

describe('GET /api', () => {
  it('should return API is running...', async () => {
    const res = await request(app).get('/api');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('API is running...');
  });
});

// Close mongoose connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

// checks that your API route /api is working properly by:

// Sending a GET request to /api

// Verifying the server responds with status code 200 (OK)

// Verifying the response body matches "API is running..."
