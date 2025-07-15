export interface DashboardStats {
  pacientes_totales: {
    total: number;
    porcentaje_cambio: number;
  };
  citas_hoy: {
    total: number;
    porcentaje_cambio: number;
  };
  ingresos_mes: {
    total: number;
    porcentaje_cambio: number;
  };
  inventario_bajo: {
    total: number;
    porcentaje_cambio: number;
  };
}

export interface ActividadReciente {
  tipo: 'cita_cancelada' | 'inventario_bajo' | 'nueva_cita';
  descripcion: string;
  tiempo: string;
}

export interface IngresoMensual {
  año: number;
  mes: number;
  total_ingresos: number;
  total_pagos: number;
  promedio_pago: number;
}
