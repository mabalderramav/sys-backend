// src/repositories/GrupoProductoRepository.ts
import { IProveedorRepository } from '../../interfaces/IProveedorRepository';
import { IProveedor } from '../../models/proveedor';
import { EntidadContext } from '../../strateties/contexts/EntidadContext';
import { ProveedorStrategy } from '../../strateties/postgress/ProveedorStrategy';

export class ProveedorRepository implements IProveedorRepository {
  entidadContext = new EntidadContext();

  async registrarProveedorProducto(proveedor: IProveedor): Promise<void> {
    const action = 'crear';
    this.entidadContext.setStrategy(new ProveedorStrategy(action));
    const proveedorArray = Object.values(proveedor);
    return await this.entidadContext.executeStrategy(proveedorArray);
  }
}
