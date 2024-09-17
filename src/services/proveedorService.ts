// src/services/proveedorService.ts
import { IProveedorRepository } from '../interfaces/IProveedorRepository';
import { IProveedor, Proveedor } from '../models/proveedor';

export class ProveedorService {
  private proveedorRepository: IProveedorRepository;

  constructor(proveedorRepository: IProveedorRepository) {
    this.proveedorRepository = proveedorRepository;
  }

  async registrarProveedorProducto(data: IProveedor): Promise<void> {
    const proveedor = new Proveedor(data);
    return await this.proveedorRepository.registrarProveedorProducto(proveedor);
  }

  async obtenerProveedores(): Promise<IProveedor[]> {
    return await this.proveedorRepository.obtenerProveedores();
  }
}
