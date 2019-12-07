import { Router } from 'express';

import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import PostController from './app/controllers/PostController';
import CommentController from './app/controllers/CommentController';
import AlbumController from './app/controllers/AlbumController';

import authMiddleware from './app/middleware/auth';

import validateUserStore from './app/validators/UserStore';
import validateSessionStore from './app/validators/SessionStore';
import PostStore from './app/validators/Post/Store';
import PostUpdate from './app/validators/Post/Update';

const bruteStore = new BruteRedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const bruteForce = new Brute(bruteStore);
const routes = new Router();

// Routes
routes.post('/users', validateUserStore, UserController.store);
routes.post(
  '/sessions',
  // HABILITAR ANTES DE MANDAR
  bruteForce.prevent,
  validateSessionStore,
  SessionController.store
);

routes.use(authMiddleware);

// Daqui para baixo apenas Autenticado

routes.get('/posts/:id?', PostController.index);
routes.post('/posts/', PostStore, PostController.store);
routes.put('/posts/', PostUpdate, PostController.update);
routes.delete('/posts/:id', PostController.delete);

routes.get('/posts/:id/comments', CommentController.index);
routes.get('/users/:userId/albums', AlbumController.index);

export default routes;
