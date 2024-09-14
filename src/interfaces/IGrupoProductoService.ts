import { GrupoProducto } from '../models/grupoProducto';

export interface IGrupoProductoService {
  registrarGrupoProducto(grupoProducto: GrupoProducto): Promise<void>;
}
