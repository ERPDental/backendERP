// Archivo de prueba simple
const express = require('express');

const app = express();
const PORT = 3000;

// Middleware básico
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: 'Servidor de prueba funcionando',
    timestamp: new Date().toISOString()
  });
});

// Dashboard de prueba
app.get('/api/dashboard', (req, res) => {
  res.json({
    success: true,
    message: 'Dashboard funcionando',
    data: {
      stats: {
        pacientes_totales: { total: 2845, porcentaje_cambio: 12 },
        citas_hoy: { total: 24, porcentaje_cambio: 4 },
        ingresos_mes: { total: 48350, porcentaje_cambio: 23 },
        inventario_bajo: { total: 12, porcentaje_cambio: 3 }
      }
    }
  });
});

// Pacientes de prueba
app.get('/api/pacientes', (req, res) => {
  res.json({
    success: true,
    message: 'Pacientes obtenidos exitosamente',
    data: [
      {
        id_paciente: 1,
        nombre: 'Juan',
        apellido_paterno: 'Pérez',
        apellido_materno: 'González',
        telefono: '871-234-5678',
        email: 'juan.perez@email.com'
      },
      {
        id_paciente: 2,
        nombre: 'Ana',
        apellido_paterno: 'Martínez',
        apellido_materno: 'López',
        telefono: '871-876-5432',
        email: 'ana.martinez@email.com'
      }
    ],
    total: 2
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor de prueba funcionando en puerto ${PORT}`);
  console.log(`📱 Dashboard: http://localhost:${PORT}/api/dashboard`);
  console.log(`👥 Pacientes: http://localhost:${PORT}/api/pacientes`);
});
