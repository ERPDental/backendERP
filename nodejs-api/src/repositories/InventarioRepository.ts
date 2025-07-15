const { executeQuery } = require('../config/database');
import { Inventario, InventarioBajo, CreateInventarioDto } from '../models/Inventario';

export class InventarioRepository {
  
  async findAll(): Promise<Inventario[]> {
    try {
      const query = `
        SELECT 
          i.*,
          p.nombre as proveedor
        FROM inventario i
        LEFT JOIN proveedores p ON i.id_proveedor = p.id_proveedor
        WHERE i.estado = 'Activo'
        ORDER BY i.nombre
      `;
      return await executeQuery(query);
    } catch (error) {
      console.error('Error in InventarioRepository.findAll:', error);
      throw error;
    }
  }

  async findById(id: number): Promise<Inventario | null> {
    try {
      const query = `
        SELECT 
          i.*,
          p.nombre as proveedor
        FROM inventario i
        LEFT JOIN proveedores p ON i.id_proveedor = p.id_proveedor
        WHERE i.id_item = $1 AND i.estado = 'Activo'
      `;
      const result = await executeQuery(query, [id]);
      return result.length > 0 ? result[0] : null;
    } catch (error) {
      console.error('Error in InventarioRepository.findById:', error);
      throw error;
    }
  }

  async findInventarioBajo(): Promise<InventarioBajo[]> {
    try {
      const query = `
        SELECT 
          i.nombre,
          i.categoria,
          i.stock_actual,
          i.stock_minimo,
          (i.stock_minimo - i.stock_actual) AS cantidad_requerida,
          p.nombre AS proveedor,
          p.telefono AS telefono_proveedor
        FROM inventario i
        LEFT JOIN proveedores p ON i.id_proveedor = p.id_proveedor
        WHERE i.stock_actual <= i.stock_minimo AND i.estado = 'Activo'
        ORDER BY cantidad_requerida DESC
      `;
      return await executeQuery(query);
    } catch (error) {
      console.error('Error in InventarioRepository.findInventarioBajo:', error);
      throw error;
    }
  }

  async create(inventarioData: CreateInventarioDto): Promise<Inventario> {
    try {
      const query = `
        INSERT INTO inventario (
          nombre, descripcion, categoria, marca, modelo, stock_actual, 
          stock_minimo, precio_unitario, unidad_medida, fecha_caducidad, id_proveedor
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *
      `;
      
      const values = [
        inventarioData.nombre,
        inventarioData.descripcion || null,
        inventarioData.categoria || null,
        inventarioData.marca || null,
        inventarioData.modelo || null,
        inventarioData.stock_actual,
        inventarioData.stock_minimo,
        inventarioData.precio_unitario || null,
        inventarioData.unidad_medida || null,
        inventarioData.fecha_caducidad || null,
        inventarioData.id_proveedor || null
      ];

      const result = await executeQuery(query, values);
      return result[0];
    } catch (error) {
      console.error('Error in InventarioRepository.create:', error);
      throw error;
    }
  }

  async update(id: number, inventarioData: Partial<CreateInventarioDto>): Promise<Inventario | null> {
    try {
      const fields: string[] = [];
      const values: any[] = [];
      let paramCount = 1;

      Object.entries(inventarioData).forEach(([key, value]) => {
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
        UPDATE inventario 
        SET ${fields.join(', ')}
        WHERE id_item = $${paramCount}
        RETURNING *
      `;
      
      values.push(id);
      const result = await executeQuery(query, values);
      return result.length > 0 ? result[0] : null;
    } catch (error) {
      console.error('Error in InventarioRepository.update:', error);
      throw error;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const query = `
        UPDATE inventario 
        SET estado = 'Inactivo'
        WHERE id_item = $1
      `;
      await executeQuery(query, [id]);
      return true;
    } catch (error) {
      console.error('Error in InventarioRepository.delete:', error);
      throw error;
    }
  }

  async getItemsBajoStock(): Promise<number> {
    try {
      const query = `
        SELECT COUNT(*) as total 
        FROM inventario 
        WHERE stock_actual <= stock_minimo AND estado = 'Activo'
      `;
      const result = await executeQuery(query);
      return parseInt(result[0].total);
    } catch (error) {
      console.error('Error in InventarioRepository.getItemsBajoStock:', error);
      throw error;
    }
  }

  async findByCategoria(categoria: string): Promise<Inventario[]> {
    try {
      const query = `
        SELECT 
          i.*,
          p.nombre as proveedor
        FROM inventario i
        LEFT JOIN proveedores p ON i.id_proveedor = p.id_proveedor
        WHERE i.categoria = $1 AND i.estado = 'Activo'
        ORDER BY i.nombre
      `;
      return await executeQuery(query, [categoria]);
    } catch (error) {
      console.error('Error in InventarioRepository.findByCategoria:', error);
      throw error;
    }
  }
}
