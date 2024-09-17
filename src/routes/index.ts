import { Router } from 'express';
import grupoProductoRoutes from '../routes/grupoProductoRoutes';
import productoRoutes from '../routes/productoRoutes';
import proveedorRoutes from '../routes/proveedorRoutes';
import fabricanteRoutes from '../routes/fabricanteRoutes';
import inventarioRoutes from '../routes/inventarioRoutes';
import unidadMedidaRoutes from '../routes/unidadMedidaRoutes';

const router = Router();

router.use('/grupo-producto', grupoProductoRoutes);
router.use('/producto', productoRoutes);
router.use('/proveedor', proveedorRoutes);
router.use('/inventario', inventarioRoutes);
router.use('/fabricante', fabricanteRoutes);
router.use('/unidad-medida', unidadMedidaRoutes);

export default router;
