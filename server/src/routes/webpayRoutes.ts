import { Router } from 'express';
import { createTransaction, commitTransaction } from '../controllers/webpayController';

const router = Router();

router.post('/create', createTransaction);
router.post('/commit', commitTransaction);

export default router;