require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simulated Database Connection Check
console.log('🔄 Attempting database connection...');
setTimeout(() => {
  console.log('⚠️  Database connection failed, using fake data mode...');
  console.log('📝 Note: All data will be simulated (not persistent)');
}, 1000);

// Import routes
const pacientesRoutes = require('./src/routes/pacientes.routes');
const dashboardRoutes = require('./src/routes/dashboard.routes');
const citasRoutes = require('./src/routes/citas.routes');
const healthRoutes = require('./src/routes/health-check.routes');

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'ERP Backend Dental - API funcionando',
    mode: 'fake-data',
    timestamp: new Date().toISOString(),
    endpoints: {
      dashboard: '/api/dashboard',
      pacientes: '/api/pacientes', 
      citas: '/api/citas',
      health: '/api/health-check'
    }
  });
});

// Rutas API
app.use('/api/pacientes', pacientesRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/citas', citasRoutes);
app.use('/api/health-check', healthRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Error interno del servidor',
    message: err.message
  });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Endpoint no encontrado',
    path: req.originalUrl,
    availableEndpoints: [
      '/api/dashboard',
      '/api/pacientes', 
      '/api/citas',
      '/api/health-check'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}/api/dashboard`);
  console.log(`👥 Pacientes: http://localhost:${PORT}/api/pacientes`);
  console.log(`📅 Citas: http://localhost:${PORT}/api/citas`);
  console.log(`❤️  Health Check: http://localhost:${PORT}/api/health-check`);
  console.log(`\n🔗 Prueba los endpoints:`);
  console.log(`   GET  http://localhost:${PORT}/api/dashboard`);
  console.log(`   GET  http://localhost:${PORT}/api/pacientes`);
  console.log(`   GET  http://localhost:${PORT}/api/citas`);
  console.log(`   GET  http://localhost:${PORT}/api/citas/hoy`);
});

module.exports = app;
