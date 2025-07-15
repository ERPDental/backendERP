const { Sequelize, QueryTypes } = require('sequelize');
const { database } = require('./env');

let sequelize: any = null;

// Solo crear conexión si hay credenciales de BD
if (database.dbHost && database.dbName && database.dbUser && database.dbPassword) {
  sequelize = new Sequelize(database.dbName, database.dbUser, database.dbPassword, {
    host: database.dbHost,
    dialect: 'postgres',
    logging: false,
    pool: { max: 10, min: 1, acquire: 30000, idle: 10000 },
  });
}

const authenticate = async (): Promise<void> => {
  if (!sequelize) {
    throw new Error('Database credentials not configured - using fake data mode');
  }
  
  try {
    await sequelize.authenticate();
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.log('Database connection failed:', errorMessage);
    throw new Error(`Database connection failed: ${errorMessage}`);
  }
};

const executeQuery = async (query: string, replacements: any[] = []): Promise<any[]> => {
  if (!sequelize) {
    throw new Error('Database not available - using fake data mode');
  }
  
  try {
    return await sequelize.query(query, {
      replacements,
      type: QueryTypes.SELECT,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Database query error: ${errorMessage}`);
  }
};

module.exports = {
  sequelize,
  authenticate,
  executeQuery,
};
