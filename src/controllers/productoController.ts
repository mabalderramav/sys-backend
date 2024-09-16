// src/controllers/productoController.ts
import { Request, Response } from 'express';
import { ProductoService } from '../services/productoService';
import { IProducto } from '../models/producto';
import { ProductoRepository } from '../repositories/postgress/ProductoRepository';
// import { ProductoRepository } from '../repositories/mongodb/ProductoRepository';

// Instanciamos el repositorio
const productoRepository = new ProductoRepository();

// Inyectar el repositorio en el servicio
const productoService = new ProductoService(productoRepository);

export const registrarProducto = async (req: Request, res: Response): Promise<void> => {
  try {
    const producto: IProducto = req.body;
    const result = await productoService.registrarProducto(producto);
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

export const obtenerProductoPorSku = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sku } = req.params;
    const result = await productoService.obtenerProductoPorSku(sku);
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

export const registrarPrecioBaseProducto = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sku } = req.params;
    const { precio } = req.body;
    const result = await productoService.registrarPrecioBaseProducto(sku, precio);
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
