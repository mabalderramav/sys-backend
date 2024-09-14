// src/controllers/inventarioController.ts
import { Request, Response } from 'express';
import { InventarioService } from '../services/inventarioService';

const inventarioService = new InventarioService();

export const registrarMinimoMaximoMRPAlmacen = async (req: Request, res: Response): Promise<void> => {
  const { sku, minimo, maximo } = req.body;

  await inventarioService.registrarMinimoMaximoMRPAlmacen(sku, minimo, maximo);

  res.status(201).send('Mínimo y máximo de MRP registrados para el almacén');
};
