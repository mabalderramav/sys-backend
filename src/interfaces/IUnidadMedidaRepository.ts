import { IUnidadMedida } from '../models/unidadMedida';

export interface IUnidadMedidaRepository {
  obtenerUnidadesMedida(): Promise<IUnidadMedida[]>;
}
