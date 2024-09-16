// src/services/grupoProductoService.ts
import { IGrupoProductoRepository } from '../interfaces/IGrupoProductoRepository';
import { IGrupoProducto, GrupoProducto } from '../models/grupoProducto';

export class GrupoProductoService {
  private grupoProductoRepository: IGrupoProductoRepository;

  constructor(grupoProductoRepository: IGrupoProductoRepository) {
    this.grupoProductoRepository = grupoProductoRepository;
  }

  async registrarGrupoProducto(data: IGrupoProducto): Promise<void> {
    const grupoProducto = new GrupoProducto(data);
    return await this.grupoProductoRepository.registrarGrupoProducto(grupoProducto);
  }
}
