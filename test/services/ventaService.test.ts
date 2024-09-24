import { describe, expect, it } from 'vitest';
import _ from 'lodash';
import { VentaService } from '../../src/services/ventaService';

const requestBody = {
  cliente: {
    codigo_cliente: 'CL123456',
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
        codigo_producto: 'PROD001',
        nombre_producto: 'Laptop HP',
        cantidad: 1,
        precio_unitario: 1200.0,
        porcentaje_descuento_item: 5.0,
        almacen: 'Principal',
      },
      {
        codigo_producto: 'SERV001',
        nombre_producto: 'Mantenimiento Laptop',
        cantidad: 2,
        precio_unitario: 200.0,
        porcentaje_descuento_item: 0.0,
        almacen: 'Servicio Técnico',
      },
    ],
  },
};

describe('Validar servicio', (): void => {
  it('Tiene que existir el servicio de la venta', (): void => {
    expect(VentaService).toBeDefined();
  });
});

describe('Validar REQUEST BODY', (): void => {
  it('retornar error si no la key(cliente)', async (): Promise<void> => {
    const ventaService = new VentaService();
    let testBody = _.cloneDeep(requestBody);
    testBody.cliente = undefined;
    await expect(ventaService.registrarVenta(testBody)).rejects.toThrowError('{"path":"cliente","message":"Required"}');
  });
  it('Retornar error si no hay la key(codigo_cliente)', async (): Promise<void> => {
    const ventaService = new VentaService();
    let testBody = _.cloneDeep(requestBody);
    testBody.cliente.codigo_cliente = undefined;
    await expect(ventaService.registrarVenta(testBody)).rejects.toThrow('{"path":"cliente.codigo_cliente","message":"Required"}');
  });
  it('retornar error si no hay la key(grupo_cliente)', async (): Promise<void> => {
    const ventaService = new VentaService();
    let testBody = _.cloneDeep(requestBody);
    testBody.cliente.grupo_cliente = undefined;
    await expect(ventaService.registrarVenta(testBody)).rejects.toThrow('{"path":"cliente.grupo_cliente","message":"Required"}');
  });
  it('retornar error si no hay la key(factura)', async (): Promise<void> => {
    const ventaService = new VentaService();
    let testBody = _.cloneDeep(requestBody);
    testBody.factura = undefined;
    await expect(ventaService.registrarVenta(testBody)).rejects.toThrow('{"path":"factura","message":"Required"}');
  });
  it('retornar error si no hay la key(condicion_pago)', async (): Promise<void> => {
    const ventaService = new VentaService();
    let testBody = _.cloneDeep(requestBody);
    testBody.factura.condicion_pago = undefined;
    await expect(ventaService.registrarVenta(testBody)).rejects.toThrow('{"path":"factura.condicion_pago","message":"Required"}');
  });
  it('retornar error si no hay la key(forma_entrega)', async (): Promise<void> => {
    const ventaService = new VentaService();
    let testBody = _.cloneDeep(requestBody);
    testBody.factura.forma_entrega = undefined;
    await expect(ventaService.registrarVenta(testBody)).rejects.toThrow('{"path":"factura.forma_entrega","message":"Required"}');
  });
  it('retornar error si no hay la key(porcentaje_impuesto)', async (): Promise<void> => {
    const ventaService = new VentaService();
    let testBody = _.cloneDeep(requestBody);
    testBody.factura.porcentaje_impuesto = undefined;
    await expect(ventaService.registrarVenta(testBody)).rejects.toThrow('{"path":"factura.porcentaje_impuesto","message":"Required"}');
  });
  it('retornar error si no hay la key(porcentaje_descuento)', async (): Promise<void> => {
    const ventaService = new VentaService();
    let testBody = _.cloneDeep(requestBody);
    testBody.factura.porcentaje_descuento = undefined;
    await expect(ventaService.registrarVenta(testBody)).rejects.toThrow('{"path":"factura.porcentaje_descuento","message":"Required"}');
  });
  it('retornar error si no hay la key(items)', async (): Promise<void> => {
    const ventaService = new VentaService();
    let testBody = _.cloneDeep(requestBody);
    testBody.factura.items = undefined;
    await expect(ventaService.registrarVenta(testBody)).rejects.toThrow('{"path":"factura.items","message":"Required"}');
  });
  it('retornar error si no hay productos cargados', async (): Promise<void> => {
    const ventaService = new VentaService();
    let testBody = _.cloneDeep(requestBody);
    testBody.factura.items = [];
    await expect(ventaService.registrarVenta(testBody)).rejects.toThrow('{"path":"factura.items","message":"Debe haber al menos un item"}');
  });
  it('retornar error si no hay codigo_producto', async (): Promise<void> => {
    const ventaService = new VentaService();
    let testBody = _.cloneDeep(requestBody);
    testBody.factura.items.push({
      // codigo_producto: 'PROD001',
      nombre_producto: 'Laptop LENOVO',
      cantidad: 1,
      precio_unitario: 1500.0,
      porcentaje_descuento_item: 5.0,
      almacen: 'Principal',
    });
    const index = testBody.factura.items.length - 1;
    await expect(ventaService.registrarVenta(testBody)).rejects.toThrow(`{"path":"factura.items.${index}.codigo_producto","message":"Required"}`);
  });
  it('retornar error si no hay porcentaje_descuento_item', async (): Promise<void> => {
    const ventaService = new VentaService();
    let testBody = _.cloneDeep(requestBody);
    testBody.factura.items.push({
      codigo_producto: 'PROD002',
      nombre_producto: 'Laptop HP',
      cantidad: 1,
      precio_unitario: 1200.0,
      // porcentaje_descuento_item: 5.0,
      almacen: 'Principal',
    });
    const index = testBody.factura.items.length - 1;
    await expect(ventaService.registrarVenta(testBody)).rejects.toThrow(`{"path":"factura.items.${index}.porcentaje_descuento_item","message":"Required"}`);
  });

  it('Retornar error si la cantidad es menor o igual a 0', async (): Promise<void> => {
    const ventaService = new VentaService();
    let testBody = _.cloneDeep(requestBody);
    testBody.factura.items[0].cantidad = 0;
    await expect(ventaService.registrarVenta(testBody)).rejects.toThrow(`{"path":"factura.items.0.cantidad","message":"La cantidad debe ser al menos 1"}`);
  });
});

describe('Validar lógica de negocio de ventas', (): void => {
  it('debería calcular correctamente el subtotal', (): void => {
    const ventaService = new VentaService();
    const { items } = requestBody.factura;
    const arraySubtotal = items.map((item) => ventaService.calcularSubTotal(item.precio_unitario, item.cantidad));
    const subtotalEsperado = [1200, 400];
    expect(arraySubtotal).toEqual(subtotalEsperado);
  });
  it('debería calcular correctamente el descuento por item', (): void => {
    const ventaService = new VentaService();
    const { items } = requestBody.factura;
    const arrayDescuentoItem = items.map((item) => ventaService.calcularDescuentoItem(item.precio_unitario, item.porcentaje_descuento_item));
    const descuentoEsperado = [60, 0];
    expect(arrayDescuentoItem).toEqual(descuentoEsperado);
  });
  it('debería aplicar correctamente el descuento por item al subtotal', (): void => {
    const ventaService = new VentaService();
    const { items } = requestBody.factura;
    const arraySubtotal = items.map((item) => ventaService.calcularSubTotal(item.precio_unitario, item.cantidad));
    const arrayDescuentoItem = items.map((item) => ventaService.calcularDescuentoItem(item.precio_unitario, item.porcentaje_descuento_item));

    const result = arraySubtotal.map((subtotal, index) => {
      const descuentoItem = arrayDescuentoItem[index];
      return subtotal - descuentoItem;
    });

    const subtotalConDescuentoEsperado = [1140, 400];
    expect(result).toEqual(subtotalConDescuentoEsperado);
  });
});
