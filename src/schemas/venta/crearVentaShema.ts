import { z } from 'zod';

export const crearVentaRequestBodySchema = z.object({
  cliente: z.object({
    id_cliente: z.number().min(1, 'El código de cliente es requerido'),
    nombre_cliente: z.string().min(1, 'El nombre de cliente es requerido'),
    grupo_cliente: z.string().min(1, 'El grupo de cliente es requerido'),
  }),
  factura: z.object({
    condicion_pago: z.string(),
    forma_entrega: z.string(),
    porcentaje_impuesto: z.number().min(0).max(100, 'El porcentaje de impuesto debe ser entre 0 y 100'),
    porcentaje_descuento: z.number().min(0).max(100, 'El descuento global debe ser entre 0 y 100'),
    items: z
      .array(
        z.object({
          id_producto: z.number().min(1, 'Reqierido'),
          sku: z.string(),
          cantidad: z.number().min(1, 'La cantidad debe ser al menos 1').nonnegative(),
          precio_unitario: z.number().min(0, 'El precio debe ser mayor o igual a 0'),
          porcentaje_descuento_item: z.number().min(0, 'El descuento no puede ser negativo'),
          id_almacen: z.number().min(1, 'Reqierido'),
        })
      )
      .min(1, 'Debe haber al menos un item'),
  }),
});
