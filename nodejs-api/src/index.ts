const expressApp = require('express');
const corsMiddleware = require('cors');
const helmetMiddleware = require('helmet');
const morganLogger = require('morgan');

// Config imports
const { globalConfig } = require('./config/env');
const { authenticate: dbAuthenticate } = require('./config/database');

// Routes import
const apiRoutes = require('./routes');

const app = expressApp();

// Middleware
app.use(helmetMiddleware());
app.use(corsMiddleware());
app.use(morganLogger('combined'));
app.use(expressApp.json());
app.use(expressApp.urlencoded({ extended: true }));

// Routes
app.use('/api', apiRoutes);

// Health check endpoint
app.get('/', (_req: any, res: any) => {
  res.json({ 
    message: 'ERP Backend API is running!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Start server
const startServer = async () => {
  const PORT = globalConfig.port || 3000;
  
  try {
    // Test database connection (optional)
    console.log('🔄 Attempting database connection...');
    await dbAuthenticate();
    console.log('✅ Database connection established successfully.');
  } catch (error) {
    console.log('⚠️  Database connection failed, using fake data mode...');
    console.log('� Note: All data will be simulated (not persistent)');
  }
  
  // Start server regardless of DB connection
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📱 API available at: http://localhost:${PORT}/api`);
    console.log(`🏥 Health check at: http://localhost:${PORT}/api/health-check`);
    console.log(`👥 Pacientes at: http://localhost:${PORT}/api/pacientes`);
    console.log(`📊 Dashboard at: http://localhost:${PORT}/api/dashboard`);
    console.log(`📈 Citas at: http://localhost:${PORT}/api/citas`);
  });
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: any) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: any) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

startServer();
