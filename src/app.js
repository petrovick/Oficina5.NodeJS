import './bootstrap';

import express from 'express';
import http from 'http';
import cors from 'cors';
import Helmet from 'helmet';
import Youch from 'youch';

import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import * as Sentry from '@sentry/node';
import redis from 'redis';
import RateLimit from 'express-rate-limit';
import RateLimitRedis from 'rate-limit-redis';

import SentryConfig from './config/sentry';

import routes from './routes';
import swaggerConfig from './config/swaggerConfig';

import 'express-async-errors';
import './database';

class App {
  constructor() {
    this.app = express();
    this.server = http.Server(this.app);

    Sentry.init(SentryConfig);
    this.documentation();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  documentation() {
    // Extended: https://swagger.io/specification/#infoObject
    const options = swaggerConfig;
    const swaggerSpec = swaggerJsDoc(options);
    this.app.get('/swagger.json', function(req, res) {
      res.setHeader('Content-Type', 'application/json');
      res.send(swaggerSpec);
    });

    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }

  middlewares() {
    this.app.use(Sentry.Handlers.requestHandler());
    this.app.use(Helmet()); // XSS - Crosssite scripting protection
    this.app.use(cors()); // this.app.use(cors({origin: process.env.FRONT_URL,}));
    this.app.use(express.json());

    if (process.env.NODE_ENV !== 'development') {
      this.app.use(
        new RateLimit({
          store: new RateLimitRedis({
            client: redis.createClient({
              host: process.env.REDIS_HOST,
              port: process.env.REDIS_PORT,
            }),
          }),
          windowMs: 1000 * 60 * 15 /* 1000 * 60 = 1 min * 15 = 15 mins */,
          max: 1000,
        })
      );
    }
  }

  routes() {
    this.app.use(routes);
    this.app.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    /**
     * Colocando um middle de 4 parametros, o express entende que eh um middleware de excecao e joga neste middle aqui
     */

    this.app.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }
      return res.status(500).json({ error: 'Internal server error.' });
    });

    /*
    this.app.use(async (err, req, res, next) => {
      console.log('Entrou no exception');

      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json({ messages: errors });
      }
      return res.status(500).json({ messages: 'Internal server error.' });
    });
    */
  }
}

export default new App().server;
