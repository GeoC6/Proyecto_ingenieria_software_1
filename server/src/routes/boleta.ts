import { Router } from 'express';
import { getAllBoletas, getBoleta, getBoletasByCliente, createBoleta, updateBoleta, deleteBoleta } from '../controllers/boleta';
import auth from './auth';

const router = Router();

// Obtener todas las boletas
router.get('/list', auth, getAllBoletas);

// Obtener una boleta por su COD
router.get('/:cod_transaccion', auth, getBoleta);

// Obtener una boleta por el COD_CLIENTE
router.get('/cliente/:codCliente', auth, getBoletasByCliente);

// Crear una nueva boleta
router.post('/', auth, createBoleta);

// Actualizar una boleta por su COD
router.put('/:cod_transaccion', auth, updateBoleta);

// Eliminar una boleta por su COD
router.delete('/:cod_transaccion', auth, deleteBoleta);

export default router;
