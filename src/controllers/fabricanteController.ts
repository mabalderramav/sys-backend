// src/controllers/fabricanteController.ts
import { Request, Response } from 'express';
import { FabricanteService } from '../services/fabricanteService';
import { FabricanteRepository } from '../repositories/postgress/FabricanteRepository';
// import { FabricanteRepository } from '../repositories/mongodb/FabricanteRepository';

// Instanciamos el repositorio
const fabricanteRepository = new FabricanteRepository();

const fabricanteService = new FabricanteService(fabricanteRepository);

export const obtenerFabricantes = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await fabricanteService.obtenerFabricantes();
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
