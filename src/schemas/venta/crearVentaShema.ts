import { z } from 'zod';

export const crearVentaRequestBodySchema = z.object({
  cliente: z.object({
    codigo_cliente: z
      .string()
      .min(1, 'El código de cliente es requerido')
      .regex(/^[A-Z0-9]{2,10}$/, 'Solo puede ser letra o numero'),
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
          codigo_producto: z.string().min(1, 'Reqierido'),
          nombre_producto: z.string(),
          cantidad: z.number().min(1, 'La cantidad debe ser al menos 1').nonnegative(),
          precio_unitario: z.number().min(0, 'El precio debe ser mayor o igual a 0'),
          porcentaje_descuento_item: z.number().min(0, 'El descuento no puede ser negativo'),
          almacen: z.string(),
        })
      )
      .min(1, 'Debe haber al menos un item'),
  }),
});
