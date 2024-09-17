// src/routes/inventarioRoutes.ts

import { Router } from 'express';
import { obtenerUnidadesMedida } from '../controllers/unidadMedidaController';

const router = Router();

router.get('/', obtenerUnidadesMedida);

export default router;
