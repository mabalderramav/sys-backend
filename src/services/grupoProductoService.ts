// src/services/grupoProductoService.ts
import { IGrupoProductoService } from '../interfaces/IGrupoProductoService';
import { GrupoProducto } from '../models/grupoProducto';
import pool from '../database';

export class GrupoProductoService implements IGrupoProductoService {
  async registrarGrupoProducto(grupoProducto: GrupoProducto): Promise<void> {
    const { codGrupoProducto, nombreGrupoProducto } = grupoProducto;
    await pool.query(
      `INSERT INTO grupos_productos (cod_grupo_producto, nombre_grupo_producto)
       VALUES ($1, $2)`,
      [codGrupoProducto, nombreGrupoProducto]
    );
  }
}
