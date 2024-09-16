// src/repositories/GrupoProductoRepository.ts
import { IGrupoProductoRepository } from '../../interfaces/IGrupoProductoRepository';
import { IGrupoProducto, GrupoProducto } from '../../models/grupoProducto';
import { EntidadContext } from '../../strateties/contexts/EntidadContext';
import { GrupoProductoStrategy } from '../../strateties/postgress/GrupoProductoStrategy';

export class GrupoProductoRepository implements IGrupoProductoRepository {
  entidadContext = new EntidadContext();

  async registrarGrupoProducto(data: IGrupoProducto): Promise<void> {
    const action = 'crear';
    const grupoProducto = new GrupoProducto(data);
    this.entidadContext.setStrategy(new GrupoProductoStrategy(action));
    const productoArray = Object.values(grupoProducto);
    return await this.entidadContext.executeStrategy(productoArray);
  }
}
