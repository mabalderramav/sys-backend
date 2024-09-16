// src/controllers/inventarioController.ts
import { Request, Response } from 'express';
import { InventarioService } from '../services/inventarioService';
import { IInventario } from '../models/inventario';
import { InventarioRepository } from '../repositories/postgress/inventarioRepository';
// import { ProductoRepository } from '../repositories/mongodb/ProductoRepository';

// Instanciamos el repositorio
const inventoryRepository = new InventarioRepository();

// Inyectar el repositorio en el servicio
const inventarioService = new InventarioService(inventoryRepository);

export const registrarMinimoMaximoMRPAlmacen = async (req: Request, res: Response): Promise<void> => {
  try {
    const inventario: IInventario = req.body;
    const result = await inventarioService.registrarMinimoMaximoMRPAlmacen(inventario);
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
