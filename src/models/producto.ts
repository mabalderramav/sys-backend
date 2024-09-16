export interface IProducto {
  id?: number;
  sku: string;
  nombre: string;
  nombreExtranjero?: string;
  codGrupoProducto: string;
  idFabricante: number;
  idProveedor: number;
  peso: number;
  idUnidadMedida: number;
  precioLista: number;
  codBarra?: string;
  skuAlternante?: string;
}

export class Producto implements IProducto {
  id?: number;
  sku: string;
  nombre: string;
  nombreExtranjero?: string;
  codGrupoProducto: string;
  idFabricante: number;
  idProveedor: number;
  peso: number;
  idUnidadMedida: number;
  precioLista: number;
  codBarra?: string;
  skuAlternante?: string;

  constructor(data: IProducto) {
    this.id = data.id;
    this.sku = data.sku;
    this.nombre = data.nombre;
    this.nombreExtranjero = data.nombreExtranjero;
    this.codGrupoProducto = data.codGrupoProducto;
    this.idFabricante = data.idFabricante;
    this.idProveedor = data.idProveedor;
    this.peso = data.peso;
    this.idUnidadMedida = data.idUnidadMedida;
    this.precioLista = data.precioLista;
    this.codBarra = data.codBarra;
    this.skuAlternante = data.skuAlternante;
  }
}
