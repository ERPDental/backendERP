const { PacienteService } = require('../services/PacienteService');

class PacienteControllerFixed {
  pacienteService: any;

  constructor() {
    this.pacienteService = new PacienteService();
  }

  async getAllPacientes(_req: any, res: any): Promise<void> {
    try {
      const pacientes = await this.pacienteService.getAllPacientes();
      
      res.status(200).json({
        success: true,
        message: 'Pacientes obtenidos exitosamente',
        data: pacientes,
        total: pacientes.length
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener pacientes',
        error: error.message
      });
    }
  }

  async getPacienteById(req: any, res: any): Promise<void> {
    try {
      const { id } = req.params;
      const pacienteId = parseInt(id);

      if (isNaN(pacienteId)) {
        res.status(400).json({
          success: false,
          message: 'ID de paciente inválido'
        });
        return;
      }

      const paciente = await this.pacienteService.getPacienteById(pacienteId);
      
      res.status(200).json({
        success: true,
        message: 'Paciente obtenido exitosamente',
        data: paciente
      });
    } catch (error: any) {
      const statusCode = error.message === 'Paciente no encontrado' ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        message: error.message
      });
    }
  }

  async createPaciente(req: any, res: any): Promise<void> {
    try {
      const pacienteData = req.body;
      const nuevoPaciente = await this.pacienteService.createPaciente(pacienteData);
      
      res.status(201).json({
        success: true,
        message: 'Paciente creado exitosamente',
        data: nuevoPaciente
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async updatePaciente(req: any, res: any): Promise<void> {
    try {
      const { id } = req.params;
      const pacienteId = parseInt(id);
      const pacienteData = req.body;

      if (isNaN(pacienteId)) {
        res.status(400).json({
          success: false,
          message: 'ID de paciente inválido'
        });
        return;
      }

      const pacienteActualizado = await this.pacienteService.updatePaciente(pacienteId, pacienteData);
      
      res.status(200).json({
        success: true,
        message: 'Paciente actualizado exitosamente',
        data: pacienteActualizado
      });
    } catch (error: any) {
      const statusCode = error.message === 'Paciente no encontrado' ? 404 : 400;
      res.status(statusCode).json({
        success: false,
        message: error.message
      });
    }
  }

  async deletePaciente(req: any, res: any): Promise<void> {
    try {
      const { id } = req.params;
      const pacienteId = parseInt(id);

      if (isNaN(pacienteId)) {
        res.status(400).json({
          success: false,
          message: 'ID de paciente inválido'
        });
        return;
      }

      await this.pacienteService.deletePaciente(pacienteId);
      
      res.status(200).json({
        success: true,
        message: 'Paciente eliminado exitosamente'
      });
    } catch (error: any) {
      const statusCode = error.message === 'Paciente no encontrado' ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        message: error.message
      });
    }
  }

  async searchPacientes(req: any, res: any): Promise<void> {
    try {
      const { q } = req.query;

      if (!q) {
        res.status(400).json({
          success: false,
          message: 'Parámetro de búsqueda requerido'
        });
        return;
      }

      const pacientes = await this.pacienteService.searchPacientes(q);
      
      res.status(200).json({
        success: true,
        message: 'Búsqueda completada',
        data: pacientes,
        total: pacientes.length
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async getTotalPacientes(_req: any, res: any): Promise<void> {
    try {
      const total = await this.pacienteService.getTotalPacientes();
      
      res.status(200).json({
        success: true,
        data: { total_pacientes: total },
        message: 'Total de pacientes obtenido exitosamente'
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Error al obtener total de pacientes'
      });
    }
  }
}

module.exports = { PacienteController: PacienteControllerFixed };
