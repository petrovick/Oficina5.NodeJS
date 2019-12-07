import bcrypt from 'bcryptjs';
import request from 'supertest';
import app from '../../src/app';
import truncate from '../util/truncate';
import User from '../../src/app/models/User';
import factory from '../factories';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Should be able to register', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toHaveProperty('email');
  });

  it('Should not be able to register with duplicated email', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
  });

  it('Should encrypt user password when new user craeted', async () => {
    const user = await factory.create('User', {
      password: '12345678',
    });
    const compareHash = await bcrypt.compare('12345678', user.password_hash);
    expect(compareHash).toBe(true);
  });
});
