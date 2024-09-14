// src/repositories/GrupoProductoRepository.ts
import { IProveedorRepository } from '../../interfaces/IProveedorRepository';
import { Proveedor } from '../../models/proveedor';
import { EntidadContext } from '../../strateties/contexts/EntidadContext';
import { ProveedorStrategy } from '../../strateties/postgress/ProveedorStrategy';

export class ProveedorRepository implements IProveedorRepository {
  entidadContext = new EntidadContext();

  async registrarProveedorProducto(grupoProducto: Proveedor): Promise<void> {
    const action = 'crear';
    this.entidadContext.setStrategy(new ProveedorStrategy(action));
    const productoArray = Object.values(grupoProducto);
    await this.entidadContext.executeStrategy(productoArray);
  }
}
