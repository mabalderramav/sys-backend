// src/controllers/productoController.ts
import { Request, Response } from 'express';
import { ProductoService } from '../services/productoService';
import { Producto } from '../models/producto';
import { ProductoRepository } from '../repositories/postgress/ProductoRepository';
// import { ProductoRepository } from '../repositories/mongodb/ProductoRepository';

// Instanciamos el repositorio
const productoRepository = new ProductoRepository();

// Inyectar el repositorio en el servicio
const productoService = new ProductoService(productoRepository);

export const registrarProducto = async (req: Request, res: Response): Promise<void> => {
  const producto: Producto = req.body;
  await productoService.registrarProducto(producto);
  res.status(201).send('Producto registrado');
};

export const obtenerProductoPorSku = async (req: Request, res: Response): Promise<void> => {
  const { sku } = req.params;
  const result = await productoService.obtenerProductoPorSku(sku);
  res.status(200).json(result);
};

export const registrarPrecioBaseProducto = async (req: Request, res: Response): Promise<void> => {
  const { sku } = req.params;
  const { precio } = req.body;
  await productoService.registrarPrecioBaseProducto(sku, precio);
  res.status(201).send('Precio registrado');
};
