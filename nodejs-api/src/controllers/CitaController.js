const { CitaService } = require('../services/CitaService');

class CitaControllerFixed {
  citaService;

  constructor() {
    this.citaService = new CitaService();
  }

  async getAllCitas(req, res) {
    try {
      const citas = await this.citaService.getAllCitas();
      res.status(200).json({
        success: true,
        data: citas,
        message: 'Citas obtenidas exitosamente'
      });
    } catch (error) {
      console.error('Error in CitaController.getAllCitas:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Error al obtener citas'
      });
    }
  }

  async getCitaById(req, res) {
    try {
      const { id } = req.params;
      const cita = await this.citaService.getCitaById(parseInt(id));
      
      res.status(200).json({
        success: true,
        data: cita,
        message: 'Cita obtenida exitosamente'
      });
    } catch (error) {
      console.error('Error in CitaController.getCitaById:', error);
      const statusCode = error.message === 'Cita no encontrada' ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        message: error.message || 'Error al obtener cita'
      });
    }
  }

  async getCitasHoy(req, res) {
    try {
      const citas = await this.citaService.getCitasHoy();
      res.status(200).json({
        success: true,
        data: citas,
        message: 'Citas de hoy obtenidas exitosamente'
      });
    } catch (error) {
      console.error('Error in CitaController.getCitasHoy:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Error al obtener citas de hoy'
      });
    }
  }

  async createCita(req, res) {
    try {
      const citaData = req.body;
      const nuevaCita = await this.citaService.createCita(citaData);
      
      res.status(201).json({
        success: true,
        data: nuevaCita,
        message: 'Cita creada exitosamente'
      });
    } catch (error) {
      console.error('Error in CitaController.createCita:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Error al crear cita'
      });
    }
  }

  async updateCita(req, res) {
    try {
      const { id } = req.params;
      const citaData = req.body;
      const citaActualizada = await this.citaService.updateCita(parseInt(id), citaData);
      
      res.status(200).json({
        success: true,
        data: citaActualizada,
        message: 'Cita actualizada exitosamente'
      });
    } catch (error) {
      console.error('Error in CitaController.updateCita:', error);
      const statusCode = error.message === 'Cita no encontrada' ? 404 : 400;
      res.status(statusCode).json({
        success: false,
        message: error.message || 'Error al actualizar cita'
      });
    }
  }

  async deleteCita(req, res) {
    try {
      const { id } = req.params;
      await this.citaService.deleteCita(parseInt(id));
      
      res.status(200).json({
        success: true,
        message: 'Cita eliminada exitosamente'
      });
    } catch (error) {
      console.error('Error in CitaController.deleteCita:', error);
      const statusCode = error.message === 'Cita no encontrada' ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        message: error.message || 'Error al eliminar cita'
      });
    }
  }

  async getCitasByDate(req, res) {
    try {
      const { fecha } = req.params;
      const citas = await this.citaService.getCitasByDate(fecha);
      
      res.status(200).json({
        success: true,
        data: citas,
        message: `Citas para la fecha ${fecha} obtenidas exitosamente`
      });
    } catch (error) {
      console.error('Error in CitaController.getCitasByDate:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Error al obtener citas por fecha'
      });
    }
  }

  async confirmarCita(req, res) {
    try {
      const { id } = req.params;
      const citaConfirmada = await this.citaService.confirmarCita(parseInt(id));
      
      res.status(200).json({
        success: true,
        data: citaConfirmada,
        message: 'Cita confirmada exitosamente'
      });
    } catch (error) {
      console.error('Error in CitaController.confirmarCita:', error);
      const statusCode = error.message === 'Cita no encontrada' ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        message: error.message || 'Error al confirmar cita'
      });
    }
  }

  async cancelarCita(req, res) {
    try {
      const { id } = req.params;
      const citaCancelada = await this.citaService.cancelarCita(parseInt(id));
      
      res.status(200).json({
        success: true,
        data: citaCancelada,
        message: 'Cita cancelada exitosamente'
      });
    } catch (error) {
      console.error('Error in CitaController.cancelarCita:', error);
      const statusCode = error.message === 'Cita no encontrada' ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        message: error.message || 'Error al cancelar cita'
      });
    }
  }
}

module.exports = { CitaController: CitaControllerFixed };
