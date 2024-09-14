// src/repositories/ProductoRepository.ts
import { IProductoRepository } from '../../interfaces/IProductoRepository';
import { Producto, PrecioLista } from '../../models/producto';
import pool from '../../database';
import { EntidadContext } from '../../strateties/contexts/EntidadContext';
import { ProductoStrategy } from '../../strateties/postgress/ProductoStrategy';

export class ProductoRepository implements IProductoRepository {
  productoContext = new EntidadContext();

  async registrarProducto(producto: Producto): Promise<void> {
    this.productoContext.setStrategy(new ProductoStrategy('crear'));
    const productoArray = Object.values(producto);
    await this.productoContext.executeStrategy(productoArray);
  }

  async obtenerProductoPorSku(sku: string): Promise<Producto | null> {
    this.productoContext.setStrategy(new ProductoStrategy('obtener'));
    const result = await this.productoContext.executeStrategy([sku]);
    if (result?.rows.length > 0) {
      return result.rows[0];
    }
    return null;
  }

  async registrarPrecioBaseProducto(sku: string, precio: PrecioLista): Promise<void> {
    await pool.query(`UPDATE productos SET precio_lista = $1 WHERE sku = $2`, [precio.precioLista, sku]);
  }
}
