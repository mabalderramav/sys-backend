// src/routes/inventarioRoutes.ts

import { Router } from 'express';
import { registrarMinimoMaximoMRPAlmacen } from '../controllers/inventarioController';

const router = Router();

router.post('/inventario', registrarMinimoMaximoMRPAlmacen);

export default router;
