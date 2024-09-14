// src/controllers/proveedorController.ts
import { Request, Response } from 'express';
import { ProveedorService } from '../services/proveedorService';
import { Proveedor } from '../models/proveedor';

const proveedorService = new ProveedorService();

export const registrarProveedorProducto = async (req: Request, res: Response): Promise<void> => {
  const proveedor: Proveedor = req.body;

  await proveedorService.registrarProveedorProducto(proveedor);

  res.status(201).send('Proveedor registrado');
};
