import { Router } from 'express';
import { getAllDatosTarjeta, getDatoTarjeta, createDatoTarjeta, updateDatoTarjeta, deleteDatoTarjeta } from '../controllers/datos_de_tarjeta';
import auth from './auth';

const router = Router();

// Obtener todos los datos de tarjeta
router.get('/list', auth, getAllDatosTarjeta);

// Obtener un dato de tarjeta por su ID
router.get('/:numero', auth, getDatoTarjeta);

// Crear un nuevo dato de tarjeta
router.post('/', auth, createDatoTarjeta);

// Actualizar un dato de tarjeta por su ID
router.put('/:numero', auth, updateDatoTarjeta);

// Eliminar un dato de tarjeta por su ID
router.delete('/:numero', auth, deleteDatoTarjeta);

export default router;
