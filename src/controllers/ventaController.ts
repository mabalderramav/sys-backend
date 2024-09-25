// src/controllers/fabricanteController.ts
import { Request, Response } from 'express';
import { NotFountException } from '../config/exceptions/not-fount-exceptions';
import { BadRequestExceptions } from '../config/exceptions/bad-request-exceptions';
import { VentaService } from '../services/ventaService';

// Instanciamos el repositorio
const ventaService = new VentaService();

export const crearVenta = async (req: Request, res: Response): Promise<void> => {
  try {
    const ventaDto = req.body;
    ventaService.registrarVenta(ventaDto);
    res.statusCode = 200;
  } catch (error) {
    if (error instanceof NotFountException) {
      res.statusCode = 404;
    } else if (error instanceof BadRequestExceptions) {
      res.statusCode = 400;
    } else {
      res.statusCode = 500;
    }
  }
};
