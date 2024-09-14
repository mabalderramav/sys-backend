// src/controllers/grupoProductoController.ts
import { Request, Response } from 'express';
import { GrupoProductoService } from '../services/grupoProductoService';
import { GrupoProducto } from '../models/grupoProducto';
import { GrupoProductoRepository } from '../repositories/postgress/GrupoProductoRepository';
// import { GrupoProductoRepository } from '../repositories/mongodb/GrupoProductoRepository';

// Instanciamos el repositorio
const grupoProductoRepository = new GrupoProductoRepository();

// Inyectar el repositorio en el servicio
const grupoProductoService = new GrupoProductoService(grupoProductoRepository);

export const registrarGrupoProducto = async (req: Request, res: Response): Promise<void> => {
  const grupoProducto: GrupoProducto = req.body;

  await grupoProductoService.registrarGrupoProducto(grupoProducto);

  res.status(201).send('Grupo de producto registrado');
};
