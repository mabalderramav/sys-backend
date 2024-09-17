import { IEntidadStrategy } from '../IEntidadStrategy';
import pool from '../../config/poolPostgress';

export class UnidadMedidaStrategy implements IEntidadStrategy {
  private action: 'obtener';

  constructor(action: any) {
    this.action = action;
  }

  async execute(params: any[]): Promise<any> {
    const getQuery = {
      obtener: this.obtenerUnidadesMedidaQuery(),
    };

    const query = getQuery[this.action] || 'Acción no soportada';

    const result = await pool.query(query, params);
    if (result?.rows.length > 0) {
      return result.rows;
    }
    return [];
  }

  private obtenerUnidadesMedidaQuery(): string {
    const query = `
      SELECT * 
      FROM unidades_medida
      ORDER BY id asc
    `;
    return query;
  }
}
