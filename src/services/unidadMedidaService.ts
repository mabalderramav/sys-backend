// src/services/proveedorService.ts
import { IUnidadMedidaRepository } from '../interfaces/IUnidadMedidaRepository';
import { IUnidadMedida } from '../models/unidadMedida';

export class UnidadMedidaService {
  private unidadMedidaRepository: IUnidadMedidaRepository;

  constructor(unidadMedidaRepository: IUnidadMedidaRepository) {
    this.unidadMedidaRepository = unidadMedidaRepository;
  }

  async obtenerUnidadesMedida(): Promise<IUnidadMedida[]> {
    return await this.unidadMedidaRepository.obtenerUnidadesMedida();
  }
}
