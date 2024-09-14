import { Router } from 'express';
import grupoProductoRoutes from '../routes/grupoProductoRoutes';
import productoRoutes from '../routes/productoRoutes';
import proveedorRoutes from '../routes/proveedorRoutes';

const router = Router();

router.use('/grupo-producto', grupoProductoRoutes);
router.use('/producto', productoRoutes);
router.use('/proveedor', proveedorRoutes);

export default router;
