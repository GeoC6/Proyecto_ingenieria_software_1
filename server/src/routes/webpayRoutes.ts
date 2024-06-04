import { Router } from 'express';
import { createTransaction } from '../controllers/webpayController';

const router = Router();

router.post('/create', createTransaction);

export default router;