// src/repositories/GrupoProductoRepository.ts
import { IGrupoProductoRepository } from '../../interfaces/IGrupoProductoRepository';
import { GrupoProducto } from '../../models/grupoProducto';
import { EntidadContext } from '../../strateties/contexts/EntidadContext';
import { GrupoProductoStrategy } from '../../strateties/postgress/GrupoProductoStrategy';

export class GrupoProductoRepository implements IGrupoProductoRepository {
  entidadContext = new EntidadContext();

  async registrarGrupoProducto(grupoProducto: GrupoProducto): Promise<void> {
    const action = 'crear';
    this.entidadContext.setStrategy(new GrupoProductoStrategy(action));
    const productoArray = Object.values(grupoProducto);
    await this.entidadContext.executeStrategy(productoArray);
  }
}
