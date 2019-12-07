import bcrypt from 'bcryptjs';
import request from 'supertest';
import app from '../../src/app';
import truncate from '../util/truncate';
import Post from '../../src/app/models/Post';
import factory from '../factories';

let authToken;
let user;
describe('Post', () => {
  beforeEach(async done => {
    await truncate();

    request(app)
      .post('/users')
      .send({
        name: 'Bruno Coelho',
        email: 'bruno.coelho@oficina5.com.br',
        password: '12345678',
      })
      .end((err, response) => {
        request(app)
          .post('/sessions')
          .send({
            email: 'bruno.coelho@oficina5.com.br',
            password: '12345678',
          })
          .end((err, response2) => {
            user = response2.body.user;
            authToken = response2.body.token; // save the token!
            done();
          });
      });
  });

  it('Should not be able to create a post without an authentication', async () => {
    const post = {
      title: 'title de testesdfdsf sdf',
      body: 'body de teste ashuahus',
      userId: 1,
    };

    // Create Post
    const response = await request(app)
      .post('/posts')
      .send(post);
    expect(response.body.messages[0]).toEqual('Token not provided!');
  });

  it('Should create a post with authentication', async () => {
    const post = {
      title: 'title de testesdfdsf sdf',
      body: 'body de teste ashuahus',
    };

    const postResponse = await request(app)
      .post('/posts')
      .set('Authorization', `Bearer ${authToken}`)
      .send(post);

    expect(postResponse.body.id).toBeGreaterThan(0);
    expect(postResponse.body.title).toBe('title de testesdfdsf sdf');
  });
});
