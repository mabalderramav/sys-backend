// src/controllers/fabricanteController.ts
import { Request, Response } from 'express';
import { UnidadMedidaService } from '../services/unidadMedidaService';
import { UnidadMedidaRepository } from '../repositories/postgress/UnidadMedidaRepository';
// import { FabricanteRepository } from '../repositories/mongodb/FabricanteRepository';

// Instanciamos el repositorio
const unidadMedidaRepository = new UnidadMedidaRepository();

const unidadMedidaService = new UnidadMedidaService(unidadMedidaRepository);

export const obtenerUnidadesMedida = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await unidadMedidaService.obtenerUnidadesMedida();
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
