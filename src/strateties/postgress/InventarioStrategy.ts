import { IEntidadStrategy } from '../IEntidadStrategy';
import pool from '../../config/poolPostgress';

export class InventarioStrategy implements IEntidadStrategy {
  private action: 'registrar-min-max';

  constructor(action: any) {
    this.action = action;
  }
  async execute(params: any[]): Promise<any> {
    try {
      const getQuery = {
        'registrar-min-max': this.registrarMinMaxQuery(),
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

  private registrarMinMaxQuery(): string {
    const query = `
      INSERT INTO inventario (producto_sku, almacen_id, minimo, maximo)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (producto_sku)
      DO UPDATE SET minimo = EXCLUDED.minimo, maximo = EXCLUDED.maximo
      RETURNING *
    `;
    return query;
  }
}
