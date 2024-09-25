import { BadRequestExceptions } from '../config/exceptions/bad-request-exceptions';
import { crearVentaRequestBodySchema } from '../schemas/venta/crearVentaShema';
import { VentaRepository } from '../repositories/postgress/ventaRepository';

export class VentaService {
  async registrarVenta(bodyData: any) {
    try {
      const result = crearVentaRequestBodySchema.safeParse(bodyData);
      if (!result.success) {
        throw new BadRequestExceptions(
          JSON.stringify({
            path: result.error.issues[0].path.join('.'),
            message: result.error.issues[0].message,
          })
        );
      } else {
        const data = bodyData;
        const ventaRepository = new VentaRepository();

        let totalVenta: number = 0;
        let totalDescuento: number = 0;
        let totalConDescuento: number = 0;
        let totalImpuesto: number = 0;
        let totalConImpuesto: number = 0;

        data.factura.items.forEach((elem: any) => {
          totalVenta = totalVenta + this.calcularSubTotal(elem.precio_unitario, elem.cantidad);
          totalDescuento =
            totalDescuento + this.calcularDescuentoItem(elem.precio_unitario, elem.porcentaje_descuento_item);
        });

        totalDescuento = totalDescuento + ((totalVenta - totalDescuento) * data.factura.porcentaje_descuento) / 100;
        totalConDescuento = totalVenta - totalDescuento;
        totalImpuesto = (totalConDescuento * data.factura.porcentaje_impuesto) / 100;
        totalConImpuesto = totalConDescuento + totalImpuesto;

        data.factura.total_venta = totalVenta;
        data.factura.total_descuento = totalDescuento;
        data.factura.total_con_descuento = totalConDescuento;
        data.factura.total_impuesto = totalImpuesto;
        data.factura.total_con_impuesto = totalConImpuesto;
        //const result = await ventaRepository.crearVenta(data);
        console.log('Request body válido:', data);
        return data;
      }
    } catch (error) {
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
