import faker from 'faker';
import { factory } from 'factory-girl';
import User from '../src/app/models/User';
import Post from '../src/app/models/Post';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export default factory;
