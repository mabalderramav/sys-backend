// src/controllers/proveedorController.ts
import { Request, Response } from 'express';
import { ProveedorService } from '../services/proveedorService';
import { Proveedor } from '../models/proveedor';
import { ProveedorRepository } from '../repositories/postgress/ProveedorRepository';
// import { ProveedorRepository } from '../repositories/mongodb/ProveedorRepository';

// Instanciamos el repositorio
const proveedorRepository = new ProveedorRepository();

const proveedorService = new ProveedorService(proveedorRepository);

export const registrarProveedorProducto = async (req: Request, res: Response): Promise<void> => {
  try {
    const proveedor: Proveedor = req.body;
    const result = await proveedorService.registrarProveedorProducto(proveedor);

    res.status(200).json({
      error: '',
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      error: error,
      data: [],
    });
  }
};

export const obtenerProveedores = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await proveedorService.obtenerProveedores();
    res.status(200).json({
      error: '',
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      error: error,
      data: [],
    });
  }
};
