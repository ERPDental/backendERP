const { envValues } = require('./envSchema');

const config = {
  globalConfig: {
    port: envValues.PORT,
    apiKey: envValues.API_KEY,
  },
  database: {
    dbHost: envValues.DATABASE_HOST,
    dbName: envValues.DATABASE_NAME,
    dbUser: envValues.DATABASE_USER,
    dbPassword: envValues.DATABASE_PASSWORD,
  },
};

module.exports = config;
