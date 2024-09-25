// src/routes/inventarioRoutes.ts

import { Router } from 'express';
import { crearVenta } from '../controllers/ventaController';

const router = Router();

router.post('/', crearVenta);

export default router;
