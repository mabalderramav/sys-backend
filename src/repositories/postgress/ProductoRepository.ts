// src/repositories/ProductoRepository.ts
import { IProductoRepository } from '../../interfaces/IProductoRepository';
import { Producto } from '../../models/producto';
import { EntidadContext } from '../../strateties/contexts/EntidadContext';
import { ProductoStrategy } from '../../strateties/postgress/ProductoStrategy';

export class ProductoRepository implements IProductoRepository {
  entidadContext = new EntidadContext();

  async registrarProducto(producto: Producto): Promise<void> {
    const action = 'crear';
    this.entidadContext.setStrategy(new ProductoStrategy(action));
    const productoArray = Object.values(producto);
    await this.entidadContext.executeStrategy(productoArray);
  }

  async obtenerProductoPorSku(sku: string): Promise<Producto | null> {
    const action = 'obtener';
    this.entidadContext.setStrategy(new ProductoStrategy(action));
    const params = [sku];
    const result = await this.entidadContext.executeStrategy(params);
    if (result?.rows.length > 0) {
      return result.rows[0];
    }
    return null;
  }

  async registrarPrecioBaseProducto(sku: string, precio: number): Promise<void> {
    const action = 'crear-precio';
    this.entidadContext.setStrategy(new ProductoStrategy(action));
    const params = [precio, sku];
    await this.entidadContext.executeStrategy(params);
  }
}
