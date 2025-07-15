const { executeQuery } = require('../config/database');
import { DashboardStats, ActividadReciente, IngresoMensual } from '../models/Dashboard';

export class DashboardRepository {
  
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      // Para simular datos mientras no tengamos BD completa
      const pacientesTotal = await this.getPacientesTotal();
      const citasHoy = await this.getCitasHoy();
      const inventarioBajo = await this.getInventarioBajo();
      
      return {
        pacientes_totales: {
          total: pacientesTotal,
          porcentaje_cambio: 12 // Fake data por ahora
        },
        citas_hoy: {
          total: citasHoy,
          porcentaje_cambio: 4 // Fake data por ahora
        },
        ingresos_mes: {
          total: 48350,
          porcentaje_cambio: 23 // Fake data por ahora
        },
        inventario_bajo: {
          total: inventarioBajo,
          porcentaje_cambio: 3 // Fake data por ahora
        }
      };
    } catch (error) {
      console.error('Error in DashboardRepository.getDashboardStats:', error);
      // Retornar datos fake si hay error
      return {
        pacientes_totales: { total: 2845, porcentaje_cambio: 12 },
        citas_hoy: { total: 24, porcentaje_cambio: 4 },
        ingresos_mes: { total: 48350, porcentaje_cambio: 23 },
        inventario_bajo: { total: 12, porcentaje_cambio: 3 }
      };
    }
  }

  async getActividadReciente(): Promise<ActividadReciente[]> {
    try {
      // Fake data mientras no tengamos historial completo
      return [
        {
          tipo: 'cita_cancelada',
          descripcion: 'María González canceló su cita de las 3:00 PM',
          tiempo: 'Hace 5 min'
        },
        {
          tipo: 'inventario_bajo',
          descripcion: 'Guantes de látex por debajo del stock mínimo',
          tiempo: 'Hace 1 hora'
        },
        {
          tipo: 'nueva_cita',
          descripcion: 'Pedro Sánchez programó nueva cita para mañana',
          tiempo: 'Hace 2 horas'
        }
      ];
    } catch (error) {
      console.error('Error in DashboardRepository.getActividadReciente:', error);
      return [];
    }
  }

  async getIngresosMensuales(): Promise<IngresoMensual[]> {
    try {
      const query = `
        SELECT 
          EXTRACT(YEAR FROM fecha_pago) AS año,
          EXTRACT(MONTH FROM fecha_pago) AS mes,
          SUM(monto) AS total_ingresos,
          COUNT(*) AS total_pagos,
          AVG(monto) AS promedio_pago
        FROM pagos
        GROUP BY EXTRACT(YEAR FROM fecha_pago), EXTRACT(MONTH FROM fecha_pago)
        ORDER BY año DESC, mes DESC
        LIMIT 12
      `;
      return await executeQuery(query);
    } catch (error) {
      console.error('Error in DashboardRepository.getIngresosMensuales:', error);
      // Retornar datos fake si no hay tabla de pagos
      return [
        { año: 2025, mes: 7, total_ingresos: 48350, total_pagos: 156, promedio_pago: 310 },
        { año: 2025, mes: 6, total_ingresos: 52200, total_pagos: 168, promedio_pago: 311 },
        { año: 2025, mes: 5, total_ingresos: 46800, total_pagos: 142, promedio_pago: 330 }
      ];
    }
  }

  private async getPacientesTotal(): Promise<number> {
    try {
      const query = `SELECT COUNT(*) as total FROM pacientes WHERE estado = 'Activo'`;
      const result = await executeQuery(query);
      return parseInt(result[0].total);
    } catch (error) {
      return 2845; // Fake data
    }
  }

  private async getCitasHoy(): Promise<number> {
    try {
      const query = `SELECT COUNT(*) as total FROM citas WHERE fecha_cita = CURRENT_DATE`;
      const result = await executeQuery(query);
      return parseInt(result[0].total);
    } catch (error) {
      return 24; // Fake data
    }
  }

  private async getInventarioBajo(): Promise<number> {
    try {
      const query = `
        SELECT COUNT(*) as total 
        FROM inventario 
        WHERE stock_actual <= stock_minimo AND estado = 'Activo'
      `;
      const result = await executeQuery(query);
      return parseInt(result[0].total);
    } catch (error) {
      return 12; // Fake data
    }
  }
}
