export interface IVenta {
  id?: number;
  idCliente: number;
  fecha: string;
  condicionPago: string;
  formaEntrega: string;
  totalVenta: number;
  totalDescuento: number;
  totalImpuesto: number;
  totalConImpuesto: number;
}

export class Venta implements IVenta {
  id?: number;
  idCliente: number;
  fecha: string;
  condicionPago: string;
  formaEntrega: string;
  totalVenta: number;
  totalDescuento: number;
  totalImpuesto: number;
  totalConImpuesto: number;

  constructor(data: IVenta) {
    this.id = data.id;
    this.idCliente = data.idCliente;
    this.fecha = data.fecha;
    this.condicionPago = data.condicionPago;
    this.formaEntrega = data.formaEntrega;
    this.totalVenta = data.totalVenta;
    this.totalDescuento = data.totalDescuento;
    this.totalImpuesto = data.totalImpuesto;
    this.totalConImpuesto = data.totalConImpuesto;
  }
}
