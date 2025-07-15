require('dotenv').config();
const Joi = require('joi');

const envSchema = Joi.object({
  PORT: Joi.number().default(3000),
  API_KEY: Joi.string().trim().allow(null, ''),

  DATABASE_HOST: Joi.string().trim().allow(null, ''),
  DATABASE_NAME: Joi.string().trim().allow(null, ''),
  DATABASE_USER: Joi.string().trim().allow(null, ''),
  DATABASE_PASSWORD: Joi.string().trim().allow(null, ''),
  USE_FAKE_DATA: Joi.boolean().default(false),
}).unknown();

const { error, value: validatedEnvValues } = envSchema.validate(process.env);

if (error) {
  console.error('Invalid environment config:', error.details.map((e: any) => e.message).join(', '));
  process.exit(1);
}

module.exports = { envValues: validatedEnvValues };
