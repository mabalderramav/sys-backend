export interface IInventario {
  productoSku: string;
  almacenId: number;
  minimo: number;
  maximo: number;
}

export class Inventario implements IInventario {
  productoSku: string;
  almacenId: number;
  minimo: number;
  maximo: number;

  constructor(data: IInventario) {
    this.productoSku = data.productoSku;
    this.almacenId = data.almacenId;
    this.minimo = data.minimo;
    this.maximo = data.maximo;
  }
}
