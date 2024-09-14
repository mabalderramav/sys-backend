// src/repositories/GrupoProductoRepository.ts
import { IGrupoProductoService } from '../../interfaces/IGrupoProductoService';
import { GrupoProducto } from '../../models/grupoProducto';
import { EntidadContext } from '../../strateties/contexts/EntidadContext';
import { GrupoProductoStrategy } from '../../strateties/postgress/GrupoProductoStrategy';

export class GrupoProductoRepository implements IGrupoProductoService {
  productoContext = new EntidadContext();

  async registrarGrupoProducto(grupoProducto: GrupoProducto): Promise<void> {
    this.productoContext.setStrategy(new GrupoProductoStrategy('crear'));
    const productoArray = Object.values(grupoProducto);
    await this.productoContext.executeStrategy(productoArray);
  }
}
