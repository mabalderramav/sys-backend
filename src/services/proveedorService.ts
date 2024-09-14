// src/services/proveedorService.ts

import pool from '../database';
import { Proveedor } from '../models/proveedor';

export class ProveedorService {
  async registrarProveedorProducto(proveedor: Proveedor): Promise<void> {
    const { nombreProveedor } = proveedor;
    await pool.query(`INSERT INTO proveedores (nombre_proveedor) VALUES ($1)`, [nombreProveedor]);
  }
}
