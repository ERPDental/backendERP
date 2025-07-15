export interface Paciente {
  id_paciente?: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno?: string;
  fecha_nacimiento: Date;
  telefono?: string;
  email?: string;
  direccion?: string;
  cedula_identidad?: string;
  genero?: 'M' | 'F' | 'Otro';
  contacto_emergencia?: string;
  telefono_emergencia?: string;
  alergias?: string;
  enfermedades_cronicas?: string;
  medicamentos_actuales?: string;
  fecha_registro?: Date;
  estado?: 'Activo' | 'Inactivo';
}

export interface CreatePacienteDto {
  nombre: string;
  apellido_paterno: string;
  apellido_materno?: string;
  fecha_nacimiento: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  cedula_identidad?: string;
  genero?: 'M' | 'F' | 'Otro';
  contacto_emergencia?: string;
  telefono_emergencia?: string;
  alergias?: string;
  enfermedades_cronicas?: string;
  medicamentos_actuales?: string;
}

export interface UpdatePacienteDto extends Partial<CreatePacienteDto> {
  estado?: 'Activo' | 'Inactivo';
}
