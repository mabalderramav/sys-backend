import { describe, expect, it, vi } from 'vitest';
import { crearVenta } from '../../src/controllers/ventaController';
import { Request, Response } from 'express';

describe('VentaController', () => {
  it('Tiene que existir el controlador para crear venta', (): void => {
    expect(crearVenta).toBeDefined();
  });

  it('Cuando levante la exceprion NotFoundException deberia retorar 404', () => {
    const resMock: any = {};
    const reqMock: any = {};
  });
});
