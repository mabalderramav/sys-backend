// src/services/inventarioService.ts

import pool from '../database';
import { IInventarioService } from '../interfaces/IInventarioService';

export class InventarioService implements IInventarioService {
  async registrarMinimoMaximoMRPAlmacen(sku: string, minimo: number, maximo: number): Promise<void> {
    await pool.query(`INSERT INTO inventario (sku, minimo, maximo) VALUES ($1, $2, $3)`, [sku, minimo, maximo]);
  }
}
