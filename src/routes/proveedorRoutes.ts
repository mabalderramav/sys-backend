// src/routes/inventarioRoutes.ts

import { Router } from 'express';
import { registrarProveedorProducto, obtenerProveedores } from '../controllers/proveedorController';

const router = Router();

router.post('/', registrarProveedorProducto);
router.get('/', obtenerProveedores);

export default router;
