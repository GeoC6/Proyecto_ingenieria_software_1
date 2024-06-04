import { Router } from 'express';
import { getAllMetodos, getMetodo, createMetodo, updateMetodo, deleteMetodo } from '../controllers/metodos_de_pago';
import auth from './auth';

const router = Router();

// Obtener todos los métodos de pago
router.get('/list', auth, getAllMetodos);

// Obtener un método de pago por su código
router.get('/:cod_metodo_de_pago', auth, getMetodo);

// Crear un nuevo método de pago
router.post('/', auth, createMetodo);

// Actualizar un método de pago por su código
router.put('/:cod_metodo_de_pago', auth, updateMetodo);

// Eliminar un método de pago por su código
router.delete('/:cod_metodo_de_pago', auth, deleteMetodo);

export default router;