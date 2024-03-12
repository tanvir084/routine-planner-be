const request = require('supertest');
const mongoose = require('mongoose');
const { app, server } = require('../../server');
const { db } = require('../models');
require('dotenv').config();

const dbConnect = async (db) => {
  const url = process.env.MONGODB_URI;
  console.log(url);
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Mongodb Connected');
  } catch (err) {
    console.error('Error at dbConnect ::', err);
    process.exit(1);
  }
};

beforeAll(async () => {
  await dbConnect(db).catch((error) => console.error(error));
});

afterAll(async () => {
  // Remove all users and close
  // await User.remove({});
  await server.close();
  await mongoose.connection.close();
});

describe('Authentication API Tests', () => {
  test('POST - Login - /api/auth/signup/user', async () => {
    const response = await request(app).post('/api/auth/signup/user').send({
      fullName: 'test user',
      email: 'test1@gmail.com',
      password: '123456',
    });
    expect(response.statusCode).toBe(201);
  });

  test('POST - Login - /api/auth/signin/user', async () => {
    const response = await request(app).post('/api/auth/signin/user').send({
      email: 'test@gmail.com',
      password: '123456',
    });
    expect(response.statusCode).toBe(201);
  });
});
