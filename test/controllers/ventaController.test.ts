import { describe, expect, it, vi } from 'vitest';
import { crearVenta } from '../../src/controllers/ventaController';
import { VentaService } from '../../src/services/ventaService';
import { BadRequestExceptions } from '../../src/config/exceptions/bad-request-exceptions';
import { NotFountException } from '../../src/config/exceptions/not-fount-exceptions';
import { number } from 'zod';



describe('VentaController', () => {

  it('Tiene que existir el controlador para crear venta', (): void => {
    expect(crearVenta).toBeDefined();
  });

  it('Cuando levante la exception BadRequestException deberia retorar 400 http status', async () => {

    const mock = vi.spyOn(VentaService.prototype, 'registrarVenta');
    mock.mockImplementationOnce(() => {
      throw new BadRequestExceptions('');
    });

    const req: any = {}
    const res: any = { statusCode: number }
    await crearVenta(req, res);


    expect(mock).toHaveBeenCalledOnce();
    expect(res.statusCode).eq(400);
  });


  it('Cuando levante la exception NotFoundException deberia retorar 400 http status', async () => {
    const mock = vi.spyOn(VentaService.prototype, 'registrarVenta');
    mock.mockImplementationOnce(() => {
      throw new NotFountException('');
    });

    const req: any = {}
    const res: any = { statusCode: number }
    await crearVenta(req, res);


    expect(mock).toHaveBeenCalledOnce();
    expect(res.statusCode).eq(404);
  });

  it('Cuando la exception Error deberia retorar 500 http status', async () => {
    const mock = vi.spyOn(VentaService.prototype, 'registrarVenta');
    mock.mockImplementationOnce(() => {
      throw new Error('');
    });

    const req: any = {}
    const res: any = { statusCode: number }
    await crearVenta(req, res);


    expect(mock).toHaveBeenCalledOnce();
    expect(res.statusCode).eq(500);
  });

  it('Cuando la venta se registre correctamente deberia retorar 200 http status', async () => {
    const mock = vi.spyOn(VentaService.prototype, 'registrarVenta');

    const req: any = {}
    const res: any = { statusCode: number }
    await crearVenta(req, res);


    expect(mock).toHaveBeenCalledOnce();
    expect(res.statusCode).eq(200);
  });

});
