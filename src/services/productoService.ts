// src/services/ProductoService.ts
import { IProductoRepository } from '../interfaces/IProductoRepository';
import { IProducto, Producto } from '../models/producto';

export class ProductoService {
  private productoRepository: IProductoRepository;

  constructor(productoRepository: IProductoRepository) {
    this.productoRepository = productoRepository;
  }

  async registrarProducto(data: IProducto): Promise<void> {
    const producto = new Producto(data);
    return await this.productoRepository.registrarProducto(producto);
  }

  async obtenerProductos(): Promise<IProducto[]> {
    return await this.productoRepository.obtenerProductos();
  }

  async obtenerProductoPorSku(sku: string): Promise<Producto | null> {
    return await this.productoRepository.obtenerProductoPorSku(sku);
  }

  async registrarPrecioBaseProducto(sku: string, precio: number): Promise<void> {
    return await this.productoRepository.registrarPrecioBaseProducto(sku, precio);
  }
}
