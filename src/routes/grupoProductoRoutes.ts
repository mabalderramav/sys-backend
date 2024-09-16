// src/routes/grupoProductoRoutes.ts

import { Router } from 'express';
import { obtenerGrupos, registrarGrupoProducto } from '../controllers/grupoProductoController';

const router = Router();

router.post('/', registrarGrupoProducto);
router.get('/', obtenerGrupos);

export default router;
