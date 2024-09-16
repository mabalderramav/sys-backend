import { IEntidadStrategy } from '../IEntidadStrategy';
import pool from '../../config/poolPostgress';

export class GrupoProductoStrategy implements IEntidadStrategy {
  private action: 'crear' | 'obtener';

  constructor(action: 'crear' | 'obtener') {
    this.action = action;
  }

  async execute(params: any[]): Promise<any> {
    try {
      const getQuery = {
        crear: this.crearGrupoProductoStrategyQuery(),
        obtener: this.obtenerGrupoProductoStrategyQuery(),
      };

      const query = getQuery[this.action] || 'Acción no soportada';

      const result = await pool.query(query, params);
      if (result?.rows.length > 0) {
        return result.rows;
      }
      return [];
    } catch (error) {
      throw error;
    }
  }

  private crearGrupoProductoStrategyQuery(): string {
    const query = `
      INSERT INTO grupos_productos (cod_grupo_producto, nombre_grupo_producto)
      VALUES ($1, $2)
      RETURNING *
    `;
    return query;
  }

  private obtenerGrupoProductoStrategyQuery(): string {
    const query = `
      SELECT * 
      FROM grupos_productos 
      WHERE cod_grupo_producto = $1
    `;
    return query;
  }
}
