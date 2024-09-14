// src/controllers/proveedorController.ts
import { Request, Response } from 'express';
import { ProveedorService } from '../services/proveedorService';
import { Proveedor } from '../models/proveedor';
import { ProveedorRepository } from '../repositories/postgress/proveedorRepository';
// import { ProveedorRepository } from '../repositories/mongodb/proveedorRepository';

// Instanciamos el repositorio
const proveedorRepository = new ProveedorRepository();

const proveedorService = new ProveedorService(proveedorRepository);

export const registrarProveedorProducto = async (req: Request, res: Response): Promise<void> => {
  const proveedor: Proveedor = req.body;
  await proveedorService.registrarProveedorProducto(proveedor);

  res.status(201).send('Proveedor registrado');
};
