import { DashboardService } from '../services/DashboardService';

export class DashboardController {
  private dashboardService: DashboardService;

  constructor() {
    this.dashboardService = new DashboardService();
  }

  async getDashboard(_req: any, res: any): Promise<void> {
    try {
      const dashboardData = await this.dashboardService.getDashboardData();
      
      res.status(200).json({
        success: true,
        message: 'Dashboard obtenido exitosamente',
        data: dashboardData
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener datos del dashboard',
        error: error.message
      });
    }
  }

  async getStats(_req: any, res: any): Promise<void> {
    try {
      const stats = await this.dashboardService.getStats();
      
      res.status(200).json({
        success: true,
        message: 'Estadísticas obtenidas exitosamente',
        data: stats
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener estadísticas',
        error: error.message
      });
    }
  }

  async getActividadReciente(_req: any, res: any): Promise<void> {
    try {
      const actividad = await this.dashboardService.getActividadReciente();
      
      res.status(200).json({
        success: true,
        message: 'Actividad reciente obtenida exitosamente',
        data: actividad
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener actividad reciente',
        error: error.message
      });
    }
  }

  async getIngresosMensuales(_req: any, res: any): Promise<void> {
    try {
      const ingresos = await this.dashboardService.getIngresosMensuales();
      
      res.status(200).json({
        success: true,
        message: 'Ingresos mensuales obtenidos exitosamente',
        data: ingresos
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener ingresos mensuales',
        error: error.message
      });
    }
  }

  async getResumenDelDia(_req: any, res: any): Promise<void> {
    try {
      const resumen = await this.dashboardService.getResumenDelDia();
      
      res.status(200).json({
        success: true,
        message: 'Resumen del día obtenido exitosamente',
        data: resumen
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener resumen del día',
        error: error.message
      });
    }
  }
}
