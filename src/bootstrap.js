const dotnev = require('dotenv');

dotnev.config({
  path: process.env.NODE_ENV == 'test' ? '.env.test' : '.env',
});
