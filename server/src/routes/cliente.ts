import { Router } from 'express';
import { loginCliente, newCliente, getClientes, getCliente , deleteCliente, updateCliente } from '../controllers/cliente';
import auth from './auth';

const router = Router();

router.post('/', newCliente);
router.post('/login', loginCliente);
router.get('/list', auth, getClientes);
router.get('/:cod_cliente', auth, getCliente);
router.delete('/:cod_cliente', auth, deleteCliente);
router.put('/:cod_cliente', auth, updateCliente);

export default router;
