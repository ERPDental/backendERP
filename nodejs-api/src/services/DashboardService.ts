import { DashboardRepository } from '../repositories/DashboardRepository';
import { DashboardStats, ActividadReciente, IngresoMensual } from '../models/Dashboard';

export class DashboardService {
  private dashboardRepository: DashboardRepository;

  constructor() {
    this.dashboardRepository = new DashboardRepository();
  }

  async getDashboardData(): Promise<{
    stats: DashboardStats;
    actividad_reciente: ActividadReciente[];
    ingresos_mensuales: IngresoMensual[];
  }> {
    try {
      const [stats, actividadReciente, ingresosMensuales] = await Promise.all([
        this.dashboardRepository.getDashboardStats(),
        this.dashboardRepository.getActividadReciente(),
        this.dashboardRepository.getIngresosMensuales()
      ]);

      return {
        stats,
        actividad_reciente: actividadReciente,
        ingresos_mensuales: ingresosMensuales
      };
    } catch (error) {
      console.error('Error in DashboardService.getDashboardData:', error);
      throw new Error('Error al obtener datos del dashboard');
    }
  }

  async getStats(): Promise<DashboardStats> {
    try {
      return await this.dashboardRepository.getDashboardStats();
    } catch (error) {
      console.error('Error in DashboardService.getStats:', error);
      throw error;
    }
  }

  async getActividadReciente(): Promise<ActividadReciente[]> {
    try {
      return await this.dashboardRepository.getActividadReciente();
    } catch (error) {
      console.error('Error in DashboardService.getActividadReciente:', error);
      throw error;
    }
  }

  async getIngresosMensuales(): Promise<IngresoMensual[]> {
    try {
      return await this.dashboardRepository.getIngresosMensuales();
    } catch (error) {
      console.error('Error in DashboardService.getIngresosMensuales:', error);
      throw error;
    }
  }

  async getResumenDelDia(): Promise<{
    citas_totales: number;
    citas_confirmadas: number;
    citas_pendientes: number;
    citas_completadas: number;
    pacientes_atendidos: number;
    ingresos_estimados: number;
  }> {
    try {
      // Por ahora datos simulados, en el futuro se puede implementar con queries reales
      return {
        citas_totales: 24,
        citas_confirmadas: 18,
        citas_pendientes: 4,
        citas_completadas: 2,
        pacientes_atendidos: 15,
        ingresos_estimados: 8750
      };
    } catch (error) {
      console.error('Error in DashboardService.getResumenDelDia:', error);
      throw error;
    }
  }
}
