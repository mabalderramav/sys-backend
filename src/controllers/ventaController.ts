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
    const result = await ventaService.registrarVenta(ventaDto);
    res.statusCode = 200;
    res.json({
      error: '',
      data: result,
    });
    console.log(res);
  } catch (error) {
    console.log(error);
    if (error instanceof NotFountException) {
      res.statusCode = 404;
      res.json({ error: error.message, data: [] });
    } else if (error instanceof BadRequestExceptions) {
      res.statusCode = 400;
      res.json({ error: error.message, data: [] });
    } else {
      res.statusCode = 500;
      res.json({ error: 'Error desconocido', data: [] });
    }
  }
};
