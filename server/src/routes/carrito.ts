import { Router } from 'express';
import { getCarritos, newCarrito, updateCarrito, deleteCarrito } from '../controllers/carrito';
import auth from './auth';

const router = Router();

router.get('/list', auth, getCarritos);
router.post('/', auth, newCarrito);
router.put('/:cod_carrito', auth, updateCarrito);
router.delete('/:cod_carrito', auth, deleteCarrito);

export default router;
