export interface IInventarioService {
  registrarMinimoMaximoMRPAlmacen(sku: string, minimo: number, maximo: number): Promise<void>;
}
