import { Router } from 'express';
import { getDetallesFactura, getDetalleFactura, updateDetalleFactura, deleteDetalleFactura } from '../controllers/detalle_factura';
import auth from './auth';

const router = Router();

router.get('/list', auth, getDetallesFactura);
router.get('/:cod_detalle_factura', auth, getDetalleFactura);
router.put('/:cod_detalle_factura', auth, updateDetalleFactura);
router.delete('/:cod_detalle_factura', auth, deleteDetalleFactura);

export default router;
