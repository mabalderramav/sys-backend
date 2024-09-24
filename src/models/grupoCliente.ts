export interface IGrupoCliente {
  id?: number;
  nombreGrupoCliente: string;
  porcentajeDescuento: number;
}

export class GrupoCliente implements IGrupoCliente {
  id?: number;
  nombreGrupoCliente: string;
  porcentajeDescuento: number;

  constructor(data: IGrupoCliente) {
    this.id = data.id;
    this.nombreGrupoCliente = data.nombreGrupoCliente;
    this.porcentajeDescuento = data.porcentajeDescuento;
  }
}
