import { Router } from 'express';
import { getAllTransacciones, getTransaccion, createTransaccion, updateTransaccion, deleteTransaccion } from '../controllers/transaccion';
import auth from './auth';

const router = Router();

// Obtener todas las transacciones
router.get('/list', auth, getAllTransacciones);

// Obtener una transacción por su COD
router.get('/:cod_transaccion', auth, getTransaccion);

// Crear una nueva transacción
router.post('/', auth, createTransaccion);

// Actualizar una transacción por su COD
router.put('/:cod_transaccion', auth, updateTransaccion);

// Eliminar una transacción por su COD
router.delete('/:cod_transaccion', auth, deleteTransaccion);

export default router;
