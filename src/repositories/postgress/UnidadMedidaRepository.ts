// src/repositories/GrupoProductoRepository.ts
import { IUnidadMedidaRepository } from '../../interfaces/IUnidadMedidaRepository';
import { IUnidadMedida } from '../../models/unidadMedida';
import { EntidadContext } from '../../strateties/contexts/EntidadContext';
import { UnidadMedidaStrategy } from '../../strateties/postgress/UnidadMedidaStrategy';

export class UnidadMedidaRepository implements IUnidadMedidaRepository {
  entidadContext = new EntidadContext();

  async obtenerUnidadesMedida(): Promise<IUnidadMedida[]> {
    const action = 'obtener';
    this.entidadContext.setStrategy(new UnidadMedidaStrategy(action));
    const result = await this.entidadContext.executeStrategy([]);
    return result;
  }
}
