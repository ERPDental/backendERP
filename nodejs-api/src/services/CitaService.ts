const { CitaRepository } = require('../repositories/CitaRepository');

class CitaServiceFixed {
  citaRepository: any;

  constructor() {
    this.citaRepository = new CitaRepository();
  }

  async getAllCitas(): Promise<any[]> {
    try {
      return await this.citaRepository.findAll();
    } catch (error) {
      console.error('Error in CitaService.getAllCitas:', error);
      throw new Error('Error al obtener citas');
    }
  }

  async getCitaById(id: number): Promise<any> {
    try {
      const cita = await this.citaRepository.findById(id);
      if (!cita) {
        throw new Error('Cita no encontrada');
      }
      return cita;
    } catch (error) {
      console.error('Error in CitaService.getCitaById:', error);
      throw error;
    }
  }

  async getCitasHoy(): Promise<any[]> {
    try {
      return await this.citaRepository.findCitasHoy();
    } catch (error) {
      console.error('Error in CitaService.getCitasHoy:', error);
      throw error;
    }
  }

  async createCita(citaData: any): Promise<any> {
    try {
      // Validaciones básicas
      if (!citaData.id_paciente || !citaData.id_doctor || !citaData.fecha_cita || !citaData.hora_inicio || !citaData.hora_fin) {
        throw new Error('Campos obligatorios faltantes');
      }

      // Validar que la fecha no sea en el pasado
      const fechaCita = new Date(citaData.fecha_cita);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      
      if (fechaCita < hoy) {
        throw new Error('No se pueden programar citas en fechas pasadas');
      }

      // Validar horarios
      if (!this.isValidTimeFormat(citaData.hora_inicio) || !this.isValidTimeFormat(citaData.hora_fin)) {
        throw new Error('Formato de hora inválido (HH:MM)');
      }

      if (citaData.hora_inicio >= citaData.hora_fin) {
        throw new Error('La hora de inicio debe ser anterior a la hora de fin');
      }

      return await this.citaRepository.create(citaData);
    } catch (error) {
      console.error('Error in CitaService.createCita:', error);
      throw error;
    }
  }

  async updateCita(id: number, citaData: any): Promise<any> {
    try {
      // Verificar que la cita existe
      await this.getCitaById(id);

      // Validar horarios si se proporcionan
      if (citaData.hora_inicio && !this.isValidTimeFormat(citaData.hora_inicio)) {
        throw new Error('Formato de hora de inicio inválido (HH:MM)');
      }

      if (citaData.hora_fin && !this.isValidTimeFormat(citaData.hora_fin)) {
        throw new Error('Formato de hora de fin inválido (HH:MM)');
      }

      if (citaData.hora_inicio && citaData.hora_fin && citaData.hora_inicio >= citaData.hora_fin) {
        throw new Error('La hora de inicio debe ser anterior a la hora de fin');
      }

      const updatedCita = await this.citaRepository.update(id, citaData);
      if (!updatedCita) {
        throw new Error('Error al actualizar cita');
      }

      return updatedCita;
    } catch (error) {
      console.error('Error in CitaService.updateCita:', error);
      throw error;
    }
  }

  async deleteCita(id: number): Promise<void> {
    try {
      // Verificar que la cita existe
      await this.getCitaById(id);

      const deleted = await this.citaRepository.delete(id);
      if (!deleted) {
        throw new Error('Error al eliminar cita');
      }
    } catch (error) {
      console.error('Error in CitaService.deleteCita:', error);
      throw error;
    }
  }

  async getCitasByDate(fecha: string): Promise<any[]> {
    try {
      if (!this.isValidDateFormat(fecha)) {
        throw new Error('Formato de fecha inválido (YYYY-MM-DD)');
      }

      return await this.citaRepository.findByDate(fecha);
    } catch (error) {
      console.error('Error in CitaService.getCitasByDate:', error);
      throw error;
    }
  }

  async confirmarCita(id: number): Promise<any> {
    try {
      return await this.updateCita(id, { estado: 'Confirmada' });
    } catch (error) {
      console.error('Error in CitaService.confirmarCita:', error);
      throw error;
    }
  }

  async cancelarCita(id: number): Promise<any> {
    try {
      return await this.updateCita(id, { estado: 'Cancelada' });
    } catch (error) {
      console.error('Error in CitaService.cancelarCita:', error);
      throw error;
    }
  }

  async getTotalCitasHoy(): Promise<number> {
    try {
      return await this.citaRepository.getTotalToday();
    } catch (error) {
      console.error('Error in CitaService.getTotalCitasHoy:', error);
      throw error;
    }
  }

  private isValidTimeFormat(time: string): boolean {
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(time);
  }

  private isValidDateFormat(date: string): boolean {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) return false;
    
    const dateObj = new Date(date);
    return dateObj.toISOString().split('T')[0] === date;
  }
}

module.exports = { CitaService: CitaServiceFixed };
