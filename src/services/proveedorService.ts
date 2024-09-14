// src/services/proveedorService.ts
import { IProveedorRepository } from '../interfaces/IProveedorRepository';
import { Proveedor } from '../models/proveedor';

export class ProveedorService {
  private proveedorRepository: IProveedorRepository;

  constructor(proveedorRepository: IProveedorRepository) {
    this.proveedorRepository = proveedorRepository;
  }

  async registrarProveedorProducto(proveedor: Proveedor): Promise<void> {
    await this.proveedorRepository.registrarProveedorProducto(proveedor);
  }
}
