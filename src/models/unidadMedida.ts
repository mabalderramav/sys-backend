export interface IUnidadMedida {
  id?: number;
  unidad: string;
}

export class UnidadMedida implements IUnidadMedida {
  id?: number;
  unidad: string;

  constructor(data: IUnidadMedida) {
    this.id = data.id;
    this.unidad = data.unidad;
  }
}
