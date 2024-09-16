export interface IFabricante {
  skuFabricante: string;
  nombreFabricante: string;
}

export class Fabricante implements IFabricante {
  skuFabricante: string;
  nombreFabricante: string;

  constructor(data: IFabricante) {
    this.skuFabricante = data.skuFabricante;
    this.nombreFabricante = data.nombreFabricante;
  }
}
