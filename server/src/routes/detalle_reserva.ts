import { Router } from 'express';
import { getDetallesReserva, getDetalleReserva, updateDetalleReserva, deleteDetalleReserva } from '../controllers/detalle_reserva';
import auth from './auth';

const router = Router();

// Obtener todos los detalles de reserva
router.get('/list',auth, getDetallesReserva);

// Obtener un detalle de reserva por ID
router.get('/:cod_detalle_reserva', auth, getDetalleReserva);

// Crear un nuevo detalle de reserva

// Actualizar un detalle de reserva por ID
router.put('/:cod_detalle_reserva',auth, updateDetalleReserva);

// Eliminar un detalle de reserva por ID
router.delete('/:cod_detalle_reserva',auth, deleteDetalleReserva);

export default router;