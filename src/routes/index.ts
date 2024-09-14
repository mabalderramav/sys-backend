import { Router } from 'express';
import productoRoutes from '../routes/productoRoutes';

const router = Router();

router.use('/producto', productoRoutes);

export default router;
