export interface UnidadMedida {
  unidad: string;
}

export interface CodigoBarra {
  codigoBarra: string;
}

export interface Producto {
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
