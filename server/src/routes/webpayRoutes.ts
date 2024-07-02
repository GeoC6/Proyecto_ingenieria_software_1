import { Router } from 'express'
import {
  createTransaction,
  commitTransaction,
  responseTransaction,
} from '../controllers/webpayController'

const router = Router()

router.post('/create', createTransaction)
router.post('/commit', commitTransaction)
router.get('/response', responseTransaction)

export default router
