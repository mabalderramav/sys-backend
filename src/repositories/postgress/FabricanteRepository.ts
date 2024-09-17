// src/repositories/GrupoProductoRepository.ts
import { IFabricanteRepository } from '../../interfaces/IFabricanteRepository';
import { IFabricante } from '../../models/fabricante';
import { EntidadContext } from '../../strateties/contexts/EntidadContext';
import { FabricanteStrategy } from '../../strateties/postgress/FabricanteStrategy';

export class FabricanteRepository implements IFabricanteRepository {
  entidadContext = new EntidadContext();

  async obtenerFabricantes(): Promise<IFabricante[]> {
    const action = 'obtener';
    this.entidadContext.setStrategy(new FabricanteStrategy(action));
    const result = await this.entidadContext.executeStrategy([]);
    return result;
  }
}
