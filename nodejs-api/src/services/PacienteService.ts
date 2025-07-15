const { PacienteRepository } = require('../repositories/PacienteRepositorySimple');

class PacienteServiceFixed {
  pacienteRepository: any;

  constructor() {
    this.pacienteRepository = new PacienteRepository();
  }

  async getAllPacientes() {
    try {
      return await this.pacienteRepository.findAll();
    } catch (error) {
      console.error('Error in PacienteService.getAllPacientes:', error);
      throw new Error('Error al obtener pacientes');
    }
  }

  async getPacienteById(id: number) {
    try {
      const paciente = await this.pacienteRepository.findById(id);
      if (!paciente) {
        throw new Error('Paciente no encontrado');
      }
      return paciente;
    } catch (error) {
      console.error('Error in PacienteService.getPacienteById:', error);
      throw error;
    }
  }

  async createPaciente(pacienteData: any) {
    try {
      // Validaciones básicas
      if (!pacienteData.nombre || !pacienteData.apellido_paterno || !pacienteData.fecha_nacimiento) {
        throw new Error('Campos obligatorios faltantes: nombre, apellido_paterno, fecha_nacimiento');
      }

      // Validar formato de email si se proporciona
      if (pacienteData.email && !this.isValidEmail(pacienteData.email)) {
        throw new Error('Formato de email inválido');
      }

      return await this.pacienteRepository.create(pacienteData);
    } catch (error) {
      console.error('Error in PacienteService.createPaciente:', error);
      throw error;
    }
  }

  async updatePaciente(id: number, pacienteData: any) {
    try {
      // Verificar que el paciente existe
      await this.getPacienteById(id);

      // Validar formato de email si se proporciona
      if (pacienteData.email && !this.isValidEmail(pacienteData.email)) {
        throw new Error('Formato de email inválido');
      }

      const updatedPaciente = await this.pacienteRepository.update(id, pacienteData);
      if (!updatedPaciente) {
        throw new Error('Error al actualizar paciente');
      }

      return updatedPaciente;
    } catch (error) {
      console.error('Error in PacienteService.updatePaciente:', error);
      throw error;
    }
  }

  async deletePaciente(id: number) {
    try {
      // Verificar que el paciente existe
      await this.getPacienteById(id);

      const deleted = await this.pacienteRepository.delete(id);
      if (!deleted) {
        throw new Error('Error al eliminar paciente');
      }
    } catch (error) {
      console.error('Error in PacienteService.deletePaciente:', error);
      throw error;
    }
  }

  async searchPacientes(searchTerm: string) {
    try {
      if (!searchTerm || searchTerm.trim().length < 2) {
        throw new Error('Término de búsqueda debe tener al menos 2 caracteres');
      }

      return await this.pacienteRepository.findBySearch(searchTerm.trim());
    } catch (error) {
      console.error('Error in PacienteService.searchPacientes:', error);
      throw error;
    }
  }

  async getTotalPacientes() {
    try {
      return await this.pacienteRepository.getTotalCount();
    } catch (error) {
      console.error('Error in PacienteService.getTotalPacientes:', error);
      throw error;
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private calculateAge(fechaNacimiento: string): number {
    const today = new Date();
    const birthDate = new Date(fechaNacimiento);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }
}

module.exports = { PacienteService: PacienteServiceFixed };
