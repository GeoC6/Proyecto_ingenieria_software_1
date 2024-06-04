import { Router } from 'express';
import { getAllPagos, getPago, createPago, updatePago, deletePago } from '../controllers/pagos';
import auth from './auth';

const router = Router();

// Obtener todos los pagos
router.get('/list', auth, getAllPagos);

// Obtener un pago por su código
router.get('/:cod_pago', auth, getPago);

// Crear un nuevo pago
router.post('/', auth, createPago);

// Actualizar un pago por su código
router.put('/:cod_pago', auth, updatePago);

// Eliminar un pago por su código
router.delete('/:cod_pago', auth, deletePago);

export default router;