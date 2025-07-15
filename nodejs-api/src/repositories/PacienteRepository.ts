const { executeQuery } = require('../config/database');
import { Paciente, CreatePacienteDto, UpdatePacienteDto } from '../models/Paciente';

export class PacienteRepository {
  
  async findAll(): Promise<Paciente[]> {
    try {
      const query = `
        SELECT 
          id_paciente,
          nombre,
          apellido_paterno,
          apellido_materno,
          fecha_nacimiento,
          telefono,
          email,
          direccion,
          cedula_identidad,
          genero,
          contacto_emergencia,
          telefono_emergencia,
          alergias,
          enfermedades_cronicas,
          medicamentos_actuales,
          fecha_registro,
          estado
        FROM pacientes 
        WHERE estado = 'Activo'
        ORDER BY nombre, apellido_paterno
      `;
      return await executeQuery(query);
    } catch (error) {
      console.error('Error in PacienteRepository.findAll:', error);
      throw error;
    }
  }

  async findById(id: number): Promise<Paciente | null> {
    try {
      const query = `
        SELECT * FROM pacientes 
        WHERE id_paciente = $1 AND estado = 'Activo'
      `;
      const result = await executeQuery(query, [id]);
      return result.length > 0 ? result[0] : null;
    } catch (error) {
      console.error('Error in PacienteRepository.findById:', error);
      throw error;
    }
  }

  async create(pacienteData: CreatePacienteDto): Promise<Paciente> {
    try {
      const query = `
        INSERT INTO pacientes (
          nombre, apellido_paterno, apellido_materno, fecha_nacimiento,
          telefono, email, direccion, cedula_identidad, genero,
          contacto_emergencia, telefono_emergencia, alergias,
          enfermedades_cronicas, medicamentos_actuales
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        RETURNING *
      `;
      
      const values = [
        pacienteData.nombre,
        pacienteData.apellido_paterno,
        pacienteData.apellido_materno || null,
        pacienteData.fecha_nacimiento,
        pacienteData.telefono || null,
        pacienteData.email || null,
        pacienteData.direccion || null,
        pacienteData.cedula_identidad || null,
        pacienteData.genero || null,
        pacienteData.contacto_emergencia || null,
        pacienteData.telefono_emergencia || null,
        pacienteData.alergias || null,
        pacienteData.enfermedades_cronicas || null,
        pacienteData.medicamentos_actuales || null
      ];

      const result = await executeQuery(query, values);
      return result[0];
    } catch (error) {
      console.error('Error in PacienteRepository.create:', error);
      throw error;
    }
  }

  async update(id: number, pacienteData: UpdatePacienteDto): Promise<Paciente | null> {
    try {
      const fields: string[] = [];
      const values: any[] = [];
      let paramCount = 1;

      Object.entries(pacienteData).forEach(([key, value]) => {
        if (value !== undefined) {
          fields.push(`${key} = $${paramCount}`);
          values.push(value);
          paramCount++;
        }
      });

      if (fields.length === 0) {
        throw new Error('No fields to update');
      }

      const query = `
        UPDATE pacientes 
        SET ${fields.join(', ')}
        WHERE id_paciente = $${paramCount}
        RETURNING *
      `;
      
      values.push(id);
      const result = await executeQuery(query, values);
      return result.length > 0 ? result[0] : null;
    } catch (error) {
      console.error('Error in PacienteRepository.update:', error);
      throw error;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const query = `
        UPDATE pacientes 
        SET estado = 'Inactivo'
        WHERE id_paciente = $1
      `;
      const result = await executeQuery(query, [id]);
      return result.length > 0;
    } catch (error) {
      console.error('Error in PacienteRepository.delete:', error);
      throw error;
    }
  }

  async findBySearch(searchTerm: string): Promise<Paciente[]> {
    try {
      const query = `
        SELECT * FROM pacientes 
        WHERE estado = 'Activo' AND (
          nombre ILIKE $1 OR 
          apellido_paterno ILIKE $1 OR 
          apellido_materno ILIKE $1 OR
          cedula_identidad ILIKE $1 OR
          telefono ILIKE $1
        )
        ORDER BY nombre, apellido_paterno
      `;
      return await executeQuery(query, [`%${searchTerm}%`]);
    } catch (error) {
      console.error('Error in PacienteRepository.findBySearch:', error);
      throw error;
    }
  }

  async getTotalCount(): Promise<number> {
    try {
      const query = `SELECT COUNT(*) as total FROM pacientes WHERE estado = 'Activo'`;
      const result = await executeQuery(query);
      return parseInt(result[0].total);
    } catch (error) {
      console.error('Error in PacienteRepository.getTotalCount:', error);
      throw error;
    }
  }
}
