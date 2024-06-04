import { Router } from 'express';
import { getFacturas, newFactura, updateFactura, deleteFactura } from '../controllers/facturas';
import auth from './auth';

const router = Router();

router.get('/list', auth, getFacturas);
router.post('/', auth, newFactura);
router.put('/:cod_factura', auth, updateFactura);
router.delete('/:cod_factura', auth, deleteFactura);

export default router;
