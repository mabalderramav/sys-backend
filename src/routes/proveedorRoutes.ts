// src/routes/inventarioRoutes.ts

import { Router } from 'express';
import { registrarProveedorProducto } from '../controllers/proveedorController';

const router = Router();

router.post('/', registrarProveedorProducto);

export default router;
