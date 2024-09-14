import { IEntidadStrategy } from '../IEntidadStrategy';
import pool from '../../database';

export class ProductoStrategy implements IEntidadStrategy {
  private action: 'crear' | 'obtener';

  constructor(action: 'crear' | 'obtener') {
    this.action = action;
  }

  async execute(params: any[]): Promise<any> {
    const getQuery = {
      crear: this.crearProductoQuery(),
      obtener: this.obtenerProductoQuery(),
    };

    const query = getQuery[this.action] || 'Acción no soportada';

    const result = await pool.query(query, params);
    return result;
  }

  private crearProductoQuery(): string {
    const query = `
      INSERT INTO productos (sku, nombre, nombre_extranjero, cod_grupo_producto, id_fabricante, id_proveedor, peso, id_unidad_medida, precio_lista, cod_barra, sku_alternante)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    `;
    return query;
  }

  private obtenerProductoQuery(): string {
    const query = 'SELECT * FROM productos WHERE sku = $1';
    return query;
  }
}
