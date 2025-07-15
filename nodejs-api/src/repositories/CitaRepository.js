class CitaRepositorySimple {
  constructor() {
    // Datos fake para citas
    this.citas = [
      {
        id: 1,
        id_paciente: 1,
        id_doctor: 1,
        fecha_cita: '2025-07-14',
        hora_inicio: '09:00',
        hora_fin: '10:00',
        motivo: 'Limpieza dental',
        estado: 'Programada',
        notas: 'Primera cita',
        created_at: new Date('2025-07-13T10:00:00Z'),
        updated_at: new Date('2025-07-13T10:00:00Z'),
        // Datos del paciente y doctor para joins
        paciente_nombre: 'Juan Pérez',
        doctor_nombre: 'Dr. García'
      },
      {
        id: 2,
        id_paciente: 2,
        id_doctor: 2,
        fecha_cita: '2025-07-14',
        hora_inicio: '10:30',
        hora_fin: '11:30',
        motivo: 'Extracción',
        estado: 'Confirmada',
        notas: 'Traer radiografías',
        created_at: new Date('2025-07-12T15:30:00Z'),
        updated_at: new Date('2025-07-13T09:15:00Z'),
        paciente_nombre: 'María López',
        doctor_nombre: 'Dr. Martínez'
      },
      {
        id: 3,
        id_paciente: 3,
        id_doctor: 1,
        fecha_cita: '2025-07-15',
        hora_inicio: '14:00',
        hora_fin: '15:00',
        motivo: 'Revisión',
        estado: 'Programada',
        notas: 'Control post-operatorio',
        created_at: new Date('2025-07-13T11:20:00Z'),
        updated_at: new Date('2025-07-13T11:20:00Z'),
        paciente_nombre: 'Pedro Gómez',
        doctor_nombre: 'Dr. García'
      },
      {
        id: 4,
        id_paciente: 1,
        id_doctor: 3,
        fecha_cita: '2025-07-16',
        hora_inicio: '16:00',
        hora_fin: '17:30',
        motivo: 'Ortodoncia',
        estado: 'Programada',
        notas: 'Ajuste de brackets',
        created_at: new Date('2025-07-13T16:45:00Z'),
        updated_at: new Date('2025-07-13T16:45:00Z'),
        paciente_nombre: 'Juan Pérez',
        doctor_nombre: 'Dra. Rodríguez'
      }
    ];
  }

  async findAll() {
    console.log('CitaRepository: Getting all citas (fake data)');
    return [...this.citas];
  }

  async findById(id) {
    console.log(`CitaRepository: Getting cita by ID ${id} (fake data)`);
    const cita = this.citas.find(c => c.id === parseInt(id));
    return cita || null;
  }

  async findCitasHoy() {
    console.log('CitaRepository: Getting citas for today (fake data)');
    const today = new Date().toISOString().split('T')[0];
    const citasHoy = this.citas
      .filter(c => c.fecha_cita === today)
      .map(cita => ({
        id: cita.id,
        paciente: cita.paciente_nombre,
        doctor: cita.doctor_nombre,
        hora: cita.hora_inicio,
        motivo: cita.motivo,
        estado: cita.estado
      }));
    return citasHoy;
  }

  async findByDate(fecha) {
    console.log(`CitaRepository: Getting citas for date ${fecha} (fake data)`);
    return this.citas.filter(c => c.fecha_cita === fecha);
  }

  async create(citaData) {
    console.log('CitaRepository: Creating new cita (fake data)');
    const newId = Math.max(...this.citas.map(c => c.id)) + 1;
    const newCita = {
      id: newId,
      ...citaData,
      created_at: new Date(),
      updated_at: new Date(),
      // Datos simulados para el join
      paciente_nombre: `Paciente ${citaData.id_paciente}`,
      doctor_nombre: `Doctor ${citaData.id_doctor}`
    };
    
    this.citas.push(newCita);
    return newCita;
  }

  async update(id, citaData) {
    console.log(`CitaRepository: Updating cita ${id} (fake data)`);
    const index = this.citas.findIndex(c => c.id === parseInt(id));
    if (index === -1) return null;

    this.citas[index] = {
      ...this.citas[index],
      ...citaData,
      updated_at: new Date()
    };

    return this.citas[index];
  }

  async delete(id) {
    console.log(`CitaRepository: Deleting cita ${id} (fake data)`);
    const index = this.citas.findIndex(c => c.id === parseInt(id));
    if (index === -1) return false;

    this.citas.splice(index, 1);
    return true;
  }

  async getTotalToday() {
    console.log('CitaRepository: Getting total citas today (fake data)');
    const today = new Date().toISOString().split('T')[0];
    return this.citas.filter(c => c.fecha_cita === today).length;
  }
}

module.exports = { CitaRepository: CitaRepositorySimple };
