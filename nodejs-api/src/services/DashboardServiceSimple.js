class DashboardServiceSimple {
  async getDashboardData() {
    try {
      return {
        stats: {
          pacientes_totales: {
            total: 2845,
            porcentaje_cambio: 12
          },
          citas_hoy: {
            total: 24,
            porcentaje_cambio: 4
          },
          ingresos_mes: {
            total: 48350,
            porcentaje_cambio: 23
          },
          inventario_bajo: {
            total: 12,
            porcentaje_cambio: 3
          }
        },
        actividad_reciente: [
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
        ],
        ingresos_mensuales: [
          { año: 2025, mes: 7, total_ingresos: 48350, total_pagos: 156, promedio_pago: 310 },
          { año: 2025, mes: 6, total_ingresos: 52200, total_pagos: 168, promedio_pago: 311 },
          { año: 2025, mes: 5, total_ingresos: 46800, total_pagos: 142, promedio_pago: 330 }
        ]
      };
    } catch (error) {
      console.error('Error in getDashboardData:', error);
      throw new Error('Error al obtener datos del dashboard');
    }
  }

  async getStats() {
    const data = await this.getDashboardData();
    return data.stats;
  }

  async getActividadReciente() {
    const data = await this.getDashboardData();
    return data.actividad_reciente;
  }

  async getIngresosMensuales() {
    const data = await this.getDashboardData();
    return data.ingresos_mensuales;
  }
}

module.exports = { DashboardService: DashboardServiceSimple };
