import { IInventario } from '../models/inventario';

export interface IInventarioRepository {
  registrarMinimoMaximoMRPAlmacen(inventario: IInventario): Promise<void>;
}
