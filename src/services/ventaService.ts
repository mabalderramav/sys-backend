import { BadRequestExceptions } from '../config/exceptions/bad-request-exceptions';
import { crearVentaRequestBodySchema } from '../schemas/venta/crearVentaShema';

export class VentaService {
  async registrarVenta(data: any) {
    try {
      const result = crearVentaRequestBodySchema.safeParse(data);
      if (!result.success) {
        throw new BadRequestExceptions(
          JSON.stringify({
            path: result.error.issues[0].path.join('.'),
            message: result.error.issues[0].message,
          })
        );
      } else {
        console.log('Request body válido:', result.data);
      }

      console.log(data);
      return [1, 2];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  calcularSubTotal(precio: number, cantidad: number): number {
    return precio * cantidad;
  }
  calcularDescuentoItem(precio: number, porcentaje: number): number {
    return (precio * porcentaje) / 100;
  }
}
