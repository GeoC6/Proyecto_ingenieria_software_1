import {Router} from 'express';
import {getRol,newRol,updateRol,deleteRol,getOneRol} from '../controllers/rol';
import auth from './auth';

const router = Router();

router.get('/list',auth,getRol);
router.post('/',auth,newRol);
router.get('/:cod_rol',auth,getOneRol);
router.delete('/:cod_rol',auth,deleteRol);
router.put('/:cod_rol',auth,updateRol);

export default router;