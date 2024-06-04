
import multer from 'multer'
import {Router} from 'express';
import { agregarProductos, deleteProducto, getProducto, getProductos, newProducto, updateProducto, uploadImagen } from '../controllers/producto';
import auth from './auth';
const router = Router();
const upload = multer({ dest: './uploads' });
router.get('/list', auth,getProductos);
router.get('/:cod_producto',auth,getProducto);
router.post('/',auth,upload.single('imagen'), newProducto);
router.post('/:cod_producto/uploadImagen',auth,upload.single('imagen'), uploadImagen);
router.delete('/:cod_producto',auth,deleteProducto);
router.put('/:cod_producto',auth,updateProducto);
router.patch('/agregar/:cod_producto',auth,agregarProductos);
export default router;