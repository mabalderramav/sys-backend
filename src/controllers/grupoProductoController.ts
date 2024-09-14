// src/controllers/grupoProductoController.ts
import { Request, Response } from 'express';
import { GrupoProductoService } from '../services/grupoProductoService';
import { GrupoProducto } from '../models/grupoProducto';

const grupoProductoService = new GrupoProductoService();

export const registrarGrupoProducto = async (req: Request, res: Response): Promise<void> => {
  const grupoProducto: GrupoProducto = req.body;

  await grupoProductoService.registrarGrupoProducto(grupoProducto);

  res.status(201).send('Grupo de producto registrado');
};
