const { executeQuery } = require('../config/database');
import { Cita, CreateCitaDto, UpdateCitaDto, CitaHoy } from '../models/Cita';

export class CitaRepository {
  
  async findAll(): Promise<Cita[]> {
    try {
      const query = `
        SELECT 
          c.*,
          p.nombre || ' ' || p.apellido_paterno || ' ' || COALESCE(p.apellido_materno, '') as paciente_nombre,
          d.nombre || ' ' || d.apellido_paterno as doctor_nombre,
          p.telefono as paciente_telefono
        FROM citas c
        JOIN pacientes p ON c.id_paciente = p.id_paciente
        JOIN doctores d ON c.id_doctor = d.id_doctor
        ORDER BY c.fecha_cita DESC, c.hora_inicio DESC
      `;
      return await executeQuery(query);
    } catch (error) {
      console.error('Error in CitaRepository.findAll:', error);
      throw error;
    }
  }

  async findById(id: number): Promise<Cita | null> {
    try {
      const query = `
        SELECT 
          c.*,
          p.nombre || ' ' || p.apellido_paterno || ' ' || COALESCE(p.apellido_materno, '') as paciente_nombre,
          d.nombre || ' ' || d.apellido_paterno as doctor_nombre,
          p.telefono as paciente_telefono
        FROM citas c
        JOIN pacientes p ON c.id_paciente = p.id_paciente
        JOIN doctores d ON c.id_doctor = d.id_doctor
        WHERE c.id_cita = $1
      `;
      const result = await executeQuery(query, [id]);
      return result.length > 0 ? result[0] : null;
    } catch (error) {
      console.error('Error in CitaRepository.findById:', error);
      throw error;
    }
  }

  async findCitasHoy(): Promise<CitaHoy[]> {
    try {
      const query = `
        SELECT 
          c.id_cita,
          p.nombre || ' ' || p.apellido_paterno || ' ' || COALESCE(p.apellido_materno, '') AS paciente_completo,
          d.nombre || ' ' || d.apellido_paterno AS doctor_completo,
          c.hora_inicio,
          c.hora_fin,
          c.motivo,
          c.estado,
          p.telefono
        FROM citas c
        JOIN pacientes p ON c.id_paciente = p.id_paciente
        JOIN doctores d ON c.id_doctor = d.id_doctor
        WHERE c.fecha_cita = CURRENT_DATE
        ORDER BY c.hora_inicio
      `;
      return await executeQuery(query);
    } catch (error) {
      console.error('Error in CitaRepository.findCitasHoy:', error);
      throw error;
    }
  }

  async create(citaData: CreateCitaDto): Promise<Cita> {
    try {
      const query = `
        INSERT INTO citas (
          id_paciente, id_doctor, fecha_cita, hora_inicio, hora_fin, motivo, observaciones
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `;
      
      const values = [
        citaData.id_paciente,
        citaData.id_doctor,
        citaData.fecha_cita,
        citaData.hora_inicio,
        citaData.hora_fin,
        citaData.motivo || null,
        citaData.observaciones || null
      ];

      const result = await executeQuery(query, values);
      return result[0];
    } catch (error) {
      console.error('Error in CitaRepository.create:', error);
      throw error;
    }
  }

  async update(id: number, citaData: UpdateCitaDto): Promise<Cita | null> {
    try {
      const fields: string[] = [];
      const values: any[] = [];
      let paramCount = 1;

      Object.entries(citaData).forEach(([key, value]) => {
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
        UPDATE citas 
        SET ${fields.join(', ')}
        WHERE id_cita = $${paramCount}
        RETURNING *
      `;
      
      values.push(id);
      const result = await executeQuery(query, values);
      return result.length > 0 ? result[0] : null;
    } catch (error) {
      console.error('Error in CitaRepository.update:', error);
      throw error;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const query = `DELETE FROM citas WHERE id_cita = $1`;
      await executeQuery(query, [id]);
      return true;
    } catch (error) {
      console.error('Error in CitaRepository.delete:', error);
      throw error;
    }
  }

  async findByDate(fecha: string): Promise<Cita[]> {
    try {
      const query = `
        SELECT 
          c.*,
          p.nombre || ' ' || p.apellido_paterno || ' ' || COALESCE(p.apellido_materno, '') as paciente_nombre,
          d.nombre || ' ' || d.apellido_paterno as doctor_nombre
        FROM citas c
        JOIN pacientes p ON c.id_paciente = p.id_paciente
        JOIN doctores d ON c.id_doctor = d.id_doctor
        WHERE c.fecha_cita = $1
        ORDER BY c.hora_inicio
      `;
      return await executeQuery(query, [fecha]);
    } catch (error) {
      console.error('Error in CitaRepository.findByDate:', error);
      throw error;
    }
  }

  async getTotalToday(): Promise<number> {
    try {
      const query = `SELECT COUNT(*) as total FROM citas WHERE fecha_cita = CURRENT_DATE`;
      const result = await executeQuery(query);
      return parseInt(result[0].total);
    } catch (error) {
      console.error('Error in CitaRepository.getTotalToday:', error);
      throw error;
    }
  }
}
