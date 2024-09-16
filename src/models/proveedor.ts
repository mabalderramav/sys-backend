export interface IProveedor {
  skuProveedor: string;
  nombreProveedor: string;
}

export class Proveedor implements IProveedor {
  skuProveedor: string;
  nombreProveedor: string;

  constructor(data: IProveedor) {
    this.skuProveedor = data.skuProveedor;
    this.nombreProveedor = data.nombreProveedor;
  }
}
