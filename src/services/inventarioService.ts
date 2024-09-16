// src/services/inventarioService.ts

import { IInventarioRepository } from '../interfaces/IInventarioRepository';
import { IInventario, Inventario } from '../models/inventario';

export class InventarioService {
  private inventarioRepository: IInventarioRepository;

  constructor(inventarioRepository: IInventarioRepository) {
    this.inventarioRepository = inventarioRepository;
  }
  async registrarMinimoMaximoMRPAlmacen(data: IInventario): Promise<void> {
    const inventario = new Inventario(data);
    return await this.inventarioRepository.registrarMinimoMaximoMRPAlmacen(inventario);
  }
}
