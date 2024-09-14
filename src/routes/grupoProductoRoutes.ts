// src/routes/grupoProductoRoutes.ts

import { Router } from 'express';
import { registrarGrupoProducto } from '../controllers/grupoProductoController';

const router = Router();

router.post('/', registrarGrupoProducto);

export default router;
