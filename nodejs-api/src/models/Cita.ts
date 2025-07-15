export interface Cita {
  id_cita?: number;
  id_paciente: number;
  id_doctor: number;
  fecha_cita: Date;
  hora_inicio: string;
  hora_fin: string;
  motivo?: string;
  estado?: 'Programada' | 'Confirmada' | 'En_proceso' | 'Completada' | 'Cancelada' | 'No_asistio';
  observaciones?: string;
  fecha_creacion?: Date;
  // Para JOIN con otras tablas
  paciente_nombre?: string;
  doctor_nombre?: string;
  paciente_telefono?: string;
}

export interface CreateCitaDto {
  id_paciente: number;
  id_doctor: number;
  fecha_cita: string;
  hora_inicio: string;
  hora_fin: string;
  motivo?: string;
  observaciones?: string;
}

export interface UpdateCitaDto extends Partial<CreateCitaDto> {
  estado?: 'Programada' | 'Confirmada' | 'En_proceso' | 'Completada' | 'Cancelada' | 'No_asistio';
}

export interface CitaHoy {
  id_cita: number;
  paciente_completo: string;
  doctor_completo: string;
  hora_inicio: string;
  hora_fin: string;
  motivo?: string;
  estado: string;
  telefono?: string;
}
