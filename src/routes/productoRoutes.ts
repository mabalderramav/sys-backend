import { Router } from 'express';
import { registrarProducto, obtenerProductoPorSku } from '../controllers/productoController';

const router = Router();

router.post('/', registrarProducto);
router.get('/:id', obtenerProductoPorSku);

export default router;
