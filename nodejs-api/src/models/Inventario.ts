export interface Inventario {
  id_item?: number;
  nombre: string;
  descripcion?: string;
  categoria?: 'Instrumental' | 'Medicamento' | 'Material' | 'Equipo' | 'Consumible';
  marca?: string;
  modelo?: string;
  stock_actual: number;
  stock_minimo: number;
  precio_unitario?: number;
  unidad_medida?: string;
  fecha_caducidad?: Date;
  proveedor?: string;
  fecha_ultima_compra?: Date;
  estado?: 'Activo' | 'Inactivo' | 'Agotado';
  id_proveedor?: number;
}

export interface InventarioBajo {
  nombre: string;
  categoria: string;
  stock_actual: number;
  stock_minimo: number;
  cantidad_requerida: number;
  proveedor?: string;
  telefono_proveedor?: string;
}

export interface CreateInventarioDto {
  nombre: string;
  descripcion?: string;
  categoria?: 'Instrumental' | 'Medicamento' | 'Material' | 'Equipo' | 'Consumible';
  marca?: string;
  modelo?: string;
  stock_actual: number;
  stock_minimo: number;
  precio_unitario?: number;
  unidad_medida?: string;
  fecha_caducidad?: string;
  id_proveedor?: number;
}
