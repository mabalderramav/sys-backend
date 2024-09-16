import { IProveedor } from '../models/proveedor';

export interface IProveedorRepository {
  registrarProveedorProducto(proveedor: IProveedor): Promise<void>;
}
