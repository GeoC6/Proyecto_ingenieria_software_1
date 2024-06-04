import { Router } from 'express';
import { getAllDepositos, getDeposito, createDeposito, updateDeposito, deleteDeposito } from '../controllers/deposito';
import auth from './auth';

const router = Router();

// Obtener todos los depósitos
router.get('/list', auth, getAllDepositos);

// Obtener un depósito por su código de banco
router.get('/:cod_banco', auth, getDeposito);

// Crear un nuevo depósito
router.post('/', auth, createDeposito);

// Actualizar un depósito por su código de banco
router.put('/:cod_banco', auth, updateDeposito);

// Eliminar un depósito por su código de banco
router.delete('/:cod_banco', auth, deleteDeposito);

export default router;
