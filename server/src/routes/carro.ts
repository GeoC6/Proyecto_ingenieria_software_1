import { Router } from 'express'
import { getProducts, getTransaction } from '../controllers/carro'

const router = Router()

router.get('/products', getProducts)
router.post('/transaction', getTransaction)

export default router
