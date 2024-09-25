// src/repositories/ventaRepository.ts
import pool from '../../config/poolPostgress';

export class VentaRepository {
  async crearVenta(data: any): Promise<any> {
    const { cliente, factura } = data;
    const { total_venta, total_descuento, total_impuesto, total_con_impuesto } = factura;
    if (
      total_venta == undefined ||
      total_descuento == undefined ||
      total_impuesto == undefined ||
      total_con_impuesto == undefined
    ) {
      throw new Error('Total undefined');
    }
    const queryFactura = `
      INSERT INTO venta (
        id_cliente,
        condicion_pago,
        forma_entrega,
        total_venta,
        total_descuento,
        total_impuesto,
        total_con_impuesto
        )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;

    const paramsFactura: any = [
      cliente.id_cliente,
      factura.condicion_pago,
      factura.forma_entrega,
      total_venta,
      total_descuento,
      total_impuesto,
      total_con_impuesto,
    ];
    const result = await pool.query(queryFactura, paramsFactura);
    console.log(result);
    if (result?.rows?.length == 0) {
      throw new Error('No se inserto la factura');
    }

    const idVenta = result.rows[0].id_venta;
    const arrayDetail: any[] = [];
    factura.items.forEach(async (elem: any) => {
      const queryFactura = `
      INSERT INTO detalle_venta (
        id_venta,
        id_producto,
        id_almacen,
        cantidad,
        precio_unitario,
        descuento_item,
        subtotal
        )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;

      const paramsDetalle: any = [
        idVenta,
        elem.id_producto,
        elem.id_almacen,
        elem.cantidad,
        elem.precio_unitario,
        elem.porcentaje_descuento_item,
        elem.cantidad * elem.precio_unitario,
      ];
      const result = await pool.query(queryFactura, paramsDetalle);
      if (result?.rows.length > 0) {
        arrayDetail.push(result?.rows[0]);
      }
      return arrayDetail;
    });
  }
}
