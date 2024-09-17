// src/routes/inventarioRoutes.ts

import { Router } from 'express';
import { obtenerFabricantes } from '../controllers/fabricanteController';

const router = Router();

router.get('/', obtenerFabricantes);

export default router;
