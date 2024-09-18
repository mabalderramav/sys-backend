import { IProducto } from '../models/producto';

export interface IProductoRepository {
  registrarProducto(producto: IProducto): Promise<void>;
  obtenerProductos(): Promise<IProducto[]>;
  obtenerProductoPorSku(sku: string): Promise<IProducto | null>;
  registrarPrecioBaseProducto(sku: string, precio: number): Promise<void>;
}
