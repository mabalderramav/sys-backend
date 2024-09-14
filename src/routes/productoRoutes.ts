import { Router } from 'express';
import {
  registrarProducto,
  obtenerProductoPorSku,
  registrarPrecioBaseProducto,
} from '../controllers/productoController';

const router = Router();

router.post('/', registrarProducto);
router.get('/:sku', obtenerProductoPorSku);
router.put('/:sku/precio', registrarPrecioBaseProducto);

export default router;
