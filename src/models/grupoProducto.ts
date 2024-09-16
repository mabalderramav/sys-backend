export interface IGrupoProducto {
  codGrupoProducto: string;
  nombreGrupoProducto: string;
}

export class GrupoProducto implements IGrupoProducto {
  codGrupoProducto: string;
  nombreGrupoProducto: string;

  constructor(data: IGrupoProducto) {
    this.codGrupoProducto = data.codGrupoProducto;
    this.nombreGrupoProducto = data.nombreGrupoProducto;
  }
}
