// src/services/proveedorService.ts
import { IFabricanteRepository } from '../interfaces/IFabricanteRepository';
import { IFabricante } from '../models/fabricante';

export class FabricanteService {
  private fabricanteRepository: IFabricanteRepository;

  constructor(fabricanteRepository: IFabricanteRepository) {
    this.fabricanteRepository = fabricanteRepository;
  }

  async obtenerFabricantes(): Promise<IFabricante[]> {
    return await this.fabricanteRepository.obtenerFabricantes();
  }
}
