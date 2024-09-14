import { Proveedor } from '../models/proveedor';

export interface IProveedorRepository {
  registrarProveedorProducto(proveedor: Proveedor): Promise<void>;
}
