import { Proveedor } from '../models/proveedor';

export interface IProveedorService {
  registrarProveedorProducto(proveedor: Proveedor): Promise<void>;
}
