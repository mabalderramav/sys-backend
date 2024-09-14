import { IEntidadStrategy } from '../IEntidadStrategy';
import pool from '../../database';

export class ProveedorStrategy implements IEntidadStrategy {
  private action: 'crear' | 'obtener';

  constructor(action: 'crear' | 'obtener') {
    this.action = action;
  }

  async execute(params: any[]): Promise<any> {
    const getQuery = {
      crear: this.crearProveedorQuery(),
      obtener: this.obtenerProveedorQuery(),
    };

    const query = getQuery[this.action] || 'Acción no soportada';

    const result = await pool.query(query, params);
    return result;
  }

  private crearProveedorQuery(): string {
    const query = `
      INSERT INTO proveedores (sku_proveedor, nombre_proveedor)
      VALUES ($1, $2)
    `;
    return query;
  }

  private obtenerProveedorQuery(): string {
    const query = 'SELECT * FROM proveedores WHERE sku_proveedor = $1';
    return query;
  }
}
