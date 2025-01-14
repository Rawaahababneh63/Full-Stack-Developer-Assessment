import { Router } from 'express';
import { createPaymentIntent } from '../controllers/paymentController';

const router = Router();

router.post('/payments', createPaymentIntent);

export default router;
