import { Router } from 'express';
import grupoProductoRoutes from '../routes/grupoProductoRoutes';
import productoRoutes from '../routes/productoRoutes';
import proveedorRoutes from '../routes/proveedorRoutes';
import inventarioRoutes from '../routes/inventarioRoutes';

const router = Router();

router.use('/grupo-producto', grupoProductoRoutes);
router.use('/producto', productoRoutes);
router.use('/proveedor', proveedorRoutes);
router.use('/inventario', inventarioRoutes);

export default router;
