import { Router } from 'express'
import {
  createTransaction,
  commitTransaction,
  responseTransaction,
  getTransactions
} from '../controllers/webpayController'

const router = Router()

router.post('/create', createTransaction)
router.post('/commit', commitTransaction)
router.get('/response', responseTransaction)
router.get('/transactions', getTransactions)

export default router