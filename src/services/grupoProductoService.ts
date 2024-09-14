// src/services/grupoProductoService.ts
import { IGrupoProductoRepository } from '../interfaces/IGrupoProductoRepository';
import { GrupoProducto } from '../models/grupoProducto';

export class GrupoProductoService {
  private grupoProductoRepository: IGrupoProductoRepository;

  constructor(grupoProductoRepository: IGrupoProductoRepository) {
    this.grupoProductoRepository = grupoProductoRepository;
  }

  async registrarGrupoProducto(grupoProducto: GrupoProducto): Promise<void> {
    await this.grupoProductoRepository.registrarGrupoProducto(grupoProducto);
  }
}
