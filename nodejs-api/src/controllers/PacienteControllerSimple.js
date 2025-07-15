const { PacienteService } = require('../services/PacienteServiceSimple');

class PacienteControllerSimple {
  constructor() {
    this.pacienteService = new PacienteService();
  }

  async getAllPacientes(req, res) {
    try {
      const pacientes = await this.pacienteService.getAllPacientes();
      
      res.status(200).json({
        success: true,
        message: 'Pacientes obtenidos exitosamente',
        data: pacientes,
        total: pacientes.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener pacientes',
        error: error.message
      });
    }
  }

  async getPacienteById(req, res) {
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
    } catch (error) {
      const statusCode = error.message === 'Paciente no encontrado' ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        message: error.message
      });
    }
  }

  async createPaciente(req, res) {
    try {
      const pacienteData = req.body;
      const nuevoPaciente = await this.pacienteService.createPaciente(pacienteData);
      
      res.status(201).json({
        success: true,
        message: 'Paciente creado exitosamente',
        data: nuevoPaciente
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = { PacienteController: PacienteControllerSimple };
