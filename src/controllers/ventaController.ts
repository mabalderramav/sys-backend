// src/controllers/fabricanteController.ts
import { Request, Response } from 'express';
import { NotFountException } from '../config/exceptions/not-fount-exceptions';
import { BadRequestExceptions } from '../config/exceptions/bad-request-exceptions';

// Instanciamos el repositorio

export const crearVenta = async (req: Request, res: Response): Promise<void> => {
  try {
    req.body;
    res.status(200).json({
      message: {},
    });
  } catch (error) {
    if (error instanceof NotFountException) {
      res.status(404).json({
        error: error,
      });
    } else if (error instanceof BadRequestExceptions) {
      res.status(400).json({
        error: error,
        message: error.message,
      });
    } else {
      res.status(500).json({
        message: 'Error en el servidor',
      });
    }
  }
};
