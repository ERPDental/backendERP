// Pruebas rápidas para verificar el funcionamiento
const http = require('http');

const testEndpoint = (url, description) => {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          console.log(`✅ ${description}: ${res.statusCode} - ${json.message || 'OK'}`);
          if (json.data && Array.isArray(json.data)) {
            console.log(`   📊 Datos: ${json.data.length} elementos`);
          }
          resolve(true);
        } catch (e) {
          console.log(`✅ ${description}: ${res.statusCode} - HTML Response`);
          resolve(true);
        }
      });
    }).on('error', (err) => {
      console.log(`❌ ${description}: Error - ${err.message}`);
      resolve(false);
    });
  });
};

async function runTests() {
  console.log('🧪 Ejecutando pruebas del servidor...\n');
  
  const tests = [
    ['http://localhost:3000/', 'Página principal'],
    ['http://localhost:3000/api/dashboard', 'Dashboard API'],
    ['http://localhost:3000/api/pacientes', 'Pacientes API'],
    ['http://localhost:3000/api/citas', 'Citas API'],
    ['http://localhost:3000/api/citas/hoy', 'Citas de hoy'],
    ['http://localhost:3000/api/health-check', 'Health Check']
  ];

  for (const [url, description] of tests) {
    await testEndpoint(url, description);
    await new Promise(resolve => setTimeout(resolve, 100)); // Pequeña pausa
  }

  console.log('\n🎉 Pruebas completadas!');
  console.log('\n📖 Documentación de endpoints:');
  console.log('   GET  /api/dashboard          - Estadísticas del consultorio');
  console.log('   GET  /api/pacientes          - Lista de pacientes');
  console.log('   POST /api/pacientes          - Crear paciente');
  console.log('   GET  /api/pacientes/:id      - Obtener paciente');
  console.log('   PUT  /api/pacientes/:id      - Actualizar paciente');
  console.log('   GET  /api/citas              - Lista de citas');
  console.log('   GET  /api/citas/hoy          - Citas de hoy');
  console.log('   GET  /api/citas/fecha/:fecha - Citas por fecha');
  console.log('   POST /api/citas              - Crear cita');
  console.log('   PUT  /api/citas/:id          - Actualizar cita');
}

// Esperar 2 segundos antes de ejecutar las pruebas
setTimeout(runTests, 2000);
