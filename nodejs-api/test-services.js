// Test manual del servidor
console.log('=== PROBANDO SERVIDOR ERP DENTAL ===');

// Test de datos fake
const { PacienteService } = require('./src/services/PacienteService');
const { CitaService } = require('./src/services/CitaService');

async function testServices() {
  try {
    console.log('\n📋 Probando PacienteService...');
    const pacienteService = new PacienteService();
    const pacientes = await pacienteService.getAllPacientes();
    console.log(`✅ Pacientes obtenidos: ${pacientes.length}`);
    console.log('Primer paciente:', pacientes[0]);

    console.log('\n📅 Probando CitaService...');
    const citaService = new CitaService();
    const citas = await citaService.getAllCitas();
    console.log(`✅ Citas obtenidas: ${citas.length}`);
    console.log('Primera cita:', citas[0]);

    const citasHoy = await citaService.getCitasHoy();
    console.log(`✅ Citas de hoy: ${citasHoy.length}`);

    console.log('\n🎉 TODOS LOS SERVICIOS FUNCIONAN CORRECTAMENTE');
    console.log('\n🚀 Ahora puedes ejecutar:');
    console.log('   node server-simple.js');
    console.log('   O en otro terminal: npm run dev:simple');

  } catch (error) {
    console.error('❌ Error en tests:', error.message);
  }
}

testServices();
