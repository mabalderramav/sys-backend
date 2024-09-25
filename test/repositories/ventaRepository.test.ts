import { describe, expect, it } from 'vitest';
import _ from 'lodash';
import { VentaRepository } from '../../src/repositories/postgress/ventaRepository';

const requestBody = {
  cliente: {
    id_cliente: 1,
    nombre_cliente: 'Fernando Ibarra',
    grupo_cliente: 'VIP',
  },
  factura: {
    condicion_pago: 'Contado',
    forma_entrega: 'Domicilio',
    porcentaje_impuesto: 18.0,
    porcentaje_descuento: 10.0,
    items: [
      {
        id_producto: 1,
        sku: 'CPHPRG',
        cantidad: 1,
        precio_unitario: 1200.0,
        porcentaje_descuento_item: 5.0,
        id_almacen: 2,
      },
      {
        id_producto: 3,
        sku: 'CPHPRG',
        cantidad: 2,
        precio_unitario: 100.0,
        porcentaje_descuento_item: 0.0,
        id_almacen: 1,
      },
    ],
    total_venta: 1400,
    total_descuento: 194,
    total_con_descuento: 1206,
    total_impuesto: 156.78,
    total_con_impuesto: 1362.78,
  },
};

describe('Validar repositorio', (): void => {
  it('Tiene que existir el repositorio de la venta', (): void => {
    expect(VentaRepository).toBeDefined();
  });

  it('Debe retornar error si no tiene los totales', async (): Promise<void> => {
    const ventaRepository = new VentaRepository();
    let testData = _.cloneDeep(requestBody);
    delete testData.factura.total_venta;
    await expect(ventaRepository.crearVenta(testData)).rejects.toThrow('Total undefined');
  });

  //   it('Tiene que guardar correctamente la venta', async (): Promise<void> => {
  //     const ventaRepository = new VentaRepository();
  //     const result = await ventaRepository.crearVenta(requestBody);
  //     expect(result.length).toBeGreaterThan(0);
  //   });
});
