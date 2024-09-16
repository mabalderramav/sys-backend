// src/repositories/GrupoProductoRepository.ts
import { IInventarioRepository } from '../../interfaces/IInventarioRepository';
import { IInventario, Inventario } from '../../models/inventario';
import { EntidadContext } from '../../strateties/contexts/EntidadContext';
import { InventarioStrategy } from '../../strateties/postgress/InventarioStrategy';

export class InventarioRepository implements IInventarioRepository {
  entidadContext = new EntidadContext();

  async registrarMinimoMaximoMRPAlmacen(data: IInventario): Promise<any> {
    const action = 'registrar-min-max';
    const inventario = new Inventario(data);
    this.entidadContext.setStrategy(new InventarioStrategy(action));
    const inventarioArray = Object.values(inventario);
    return await this.entidadContext.executeStrategy(inventarioArray);
  }
}
