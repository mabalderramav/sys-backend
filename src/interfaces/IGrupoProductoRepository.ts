import { GrupoProducto } from '../models/grupoProducto';

export interface IGrupoProductoRepository {
  registrarGrupoProducto(grupoProducto: GrupoProducto): Promise<void>;
  obtenerGrupoProductos(): Promise<GrupoProducto[]>;
}
