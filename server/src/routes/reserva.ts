import { Router } from 'express';
import { pdfReserva,getReserva, getReservas, newReserva, updateReserva, deleteReserva, getMasVendido, getVentasPorMes, getReservasByEstado, getReservasByCiudad, getDiaMasVendido} from '../controllers/reserva';
import auth from './auth';

const router = Router();

router.post('/', newReserva);

router.get('/list', auth, getReservas);

router.get('/:cod_reserva', getReserva);

router.put('/:cod_reserva', auth, updateReserva);

router.delete('/:cod_reserva', auth, deleteReserva);

router.get('/estado/:estado', getReservasByEstado);

router.get('/ciudad/:ciudad', auth, getReservasByCiudad);

router.post('/reporte/masvendido', auth, auth,getMasVendido);

router.post('/reporte/ventaspormes',auth, getVentasPorMes);

router.get('/reporte/diamasvendido', auth, getDiaMasVendido);

router.get('/generarpdf/:id',pdfReserva);
export default router;