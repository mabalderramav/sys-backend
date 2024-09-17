import { IFabricante } from '../models/fabricante';

export interface IFabricanteRepository {
  obtenerFabricantes(): Promise<IFabricante[]>;
}
