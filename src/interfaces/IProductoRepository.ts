import { Producto, PrecioLista } from '../models/producto';

export interface IProductoRepository {
  registrarProducto(producto: Producto): Promise<void>;
  obtenerProductoPorSku(sku: string): Promise<Producto | null>;
  registrarPrecioBaseProducto(sku: string, precio: PrecioLista): Promise<void>;
}
