// src/repositories/ProductoRepository.ts
import { IProductoRepository } from '../../interfaces/IProductoRepository';
import { IProducto } from '../../models/producto';
import { EntidadContext } from '../../strateties/contexts/EntidadContext';
import { ProductoStrategy } from '../../strateties/postgress/ProductoStrategy';

export class ProductoRepository implements IProductoRepository {
  entidadContext = new EntidadContext();

  async registrarProducto(producto: IProducto): Promise<any> {
    const action = 'crear';
    this.entidadContext.setStrategy(new ProductoStrategy(action));
    const productoArray = Object.values(producto);
    productoArray.shift();
    const result = await this.entidadContext.executeStrategy(productoArray);
    return result[0];
  }

  async obtenerProductos(): Promise<IProducto[]> {
    const action = 'obtener-todo';
    this.entidadContext.setStrategy(new ProductoStrategy(action));
    const result = await this.entidadContext.executeStrategy([]);
    return result;
  }

  async obtenerProductoPorSku(sku: string): Promise<IProducto | null> {
    const action = 'obtener';
    this.entidadContext.setStrategy(new ProductoStrategy(action));
    const params = [sku];
    const result = await this.entidadContext.executeStrategy(params);
    return result[0];
  }

  async registrarPrecioBaseProducto(sku: string, precio: number): Promise<void> {
    const action = 'crear-precio';
    this.entidadContext.setStrategy(new ProductoStrategy(action));
    const params = [precio, sku];
    return await this.entidadContext.executeStrategy(params);
  }
}
