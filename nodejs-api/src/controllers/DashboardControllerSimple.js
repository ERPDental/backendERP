const { DashboardService } = require('../services/DashboardServiceSimple');

class DashboardControllerSimple {
  constructor() {
    this.dashboardService = new DashboardService();
  }

  async getDashboard(req, res) {
    try {
      const dashboardData = await this.dashboardService.getDashboardData();
      
      res.status(200).json({
        success: true,
        message: 'Dashboard obtenido exitosamente',
        data: dashboardData
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener datos del dashboard',
        error: error.message
      });
    }
  }

  async getStats(req, res) {
    try {
      const stats = await this.dashboardService.getStats();
      
      res.status(200).json({
        success: true,
        message: 'Estadísticas obtenidas exitosamente',
        data: stats
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener estadísticas',
        error: error.message
      });
    }
  }

  async getActividadReciente(req, res) {
    try {
      const actividad = await this.dashboardService.getActividadReciente();
      
      res.status(200).json({
        success: true,
        message: 'Actividad reciente obtenida exitosamente',
        data: actividad
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener actividad reciente',
        error: error.message
      });
    }
  }

  async getIngresosMensuales(req, res) {
    try {
      const ingresos = await this.dashboardService.getIngresosMensuales();
      
      res.status(200).json({
        success: true,
        message: 'Ingresos mensuales obtenidos exitosamente',
        data: ingresos
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener ingresos mensuales',
        error: error.message
      });
    }
  }
}

module.exports = { DashboardController: DashboardControllerSimple };
