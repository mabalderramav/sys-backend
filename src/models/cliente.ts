export interface ICliente {
  id?: number;
  nombreCliente: string;
  idGrupoCliente: number;
}

export class Cliente implements ICliente {
  id?: number;
  nombreCliente: string;
  idGrupoCliente: number;

  constructor(data: ICliente) {
    this.id = data.id;
    this.nombreCliente = data.nombreCliente;
    this.idGrupoCliente = data.idGrupoCliente;
  }
}
