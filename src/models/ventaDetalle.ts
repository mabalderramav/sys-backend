export interface IVentaDetalle {
  id?: number;
  idVenta: number;
  idProducto: number;
  idAlmacen: number;
  cantidad: number;
  precioUnitario: number;
  descuentoItem: number;
  subtotal: number;
}

export class VentaDetalle implements IVentaDetalle {
  id?: number;
  idVenta: number;
  idProducto: number;
  idAlmacen: number;
  cantidad: number;
  precioUnitario: number;
  descuentoItem: number;
  subtotal: number;

  constructor(data: IVentaDetalle) {
    this.id = data.id;
    this.idVenta = data.idVenta;
    this.idProducto = data.idProducto;
    this.idAlmacen = data.idAlmacen;
    this.cantidad = data.cantidad;
    this.precioUnitario = data.precioUnitario;
    this.descuentoItem = data.descuentoItem;
    this.subtotal = data.subtotal;
  }
}
