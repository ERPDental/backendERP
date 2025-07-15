const { PacienteRepository } = require('../repositories/PacienteRepositorySimple');

class PacienteServiceSimple {
  constructor() {
    this.pacienteRepository = new PacienteRepository();
  }

  async getAllPacientes() {
    try {
      return await this.pacienteRepository.findAll();
    } catch (error) {
      console.error('Error in getAllPacientes:', error);
      throw new Error('Error al obtener pacientes');
    }
  }

  async getPacienteById(id) {
    try {
      const paciente = await this.pacienteRepository.findById(id);
      if (!paciente) {
        throw new Error('Paciente no encontrado');
      }
      return paciente;
    } catch (error) {
      console.error('Error in getPacienteById:', error);
      throw error;
    }
  }

  async createPaciente(pacienteData) {
    try {
      // Validaciones básicas
      if (!pacienteData.nombre || !pacienteData.apellido_paterno || !pacienteData.fecha_nacimiento) {
        throw new Error('Campos obligatorios faltantes: nombre, apellido_paterno, fecha_nacimiento');
      }

      return await this.pacienteRepository.create(pacienteData);
    } catch (error) {
      console.error('Error in createPaciente:', error);
      throw error;
    }
  }

  async getTotalPacientes() {
    try {
      return await this.pacienteRepository.getTotalCount();
    } catch (error) {
      console.error('Error in getTotalPacientes:', error);
      throw error;
    }
  }
}

module.exports = { PacienteService: PacienteServiceSimple };
