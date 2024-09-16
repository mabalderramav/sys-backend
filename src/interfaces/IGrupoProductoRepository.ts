import { IGrupoProducto } from '../models/grupoProducto';

export interface IGrupoProductoRepository {
  registrarGrupoProducto(grupoProducto: IGrupoProducto): Promise<void>;
  obtenerGrupoProductos(): Promise<IGrupoProducto[]>;
}
