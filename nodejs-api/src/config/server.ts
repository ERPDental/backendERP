const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');

const router = require('../routes');
const { envConfig } = require('./env');

const createServer = () => {
  const app = express();

  // Enable gzip compression
  app.use(compression());

  // Body parser with size limits
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Security headers
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );

  // Logger (use 'combined' in production)
  app.use(morgan(envConfig?.nodeEnv === 'production' ? 'combined' : 'dev'));

  // CORS configuration
  app.use(
    cors({
      origin: true,
      optionsSuccessStatus: 200,
    })
  );

  // API routes
  app.use('/api', router);

  return app;
};

module.exports = createServer;
