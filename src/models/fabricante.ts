export interface IFabricante {
  id?: number;
  skuFabricante: string;
  nombreFabricante: string;
}

export class Fabricante implements IFabricante {
  id?: number;
  skuFabricante: string;
  nombreFabricante: string;

  constructor(data: IFabricante) {
    this.id = data.id;
    this.skuFabricante = data.skuFabricante;
    this.nombreFabricante = data.nombreFabricante;
  }
}
