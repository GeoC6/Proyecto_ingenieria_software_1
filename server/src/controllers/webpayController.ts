import { Request, Response } from 'express';
import webpayService from '../services/webpayService';

export const createTransaction = async (req: Request, res: Response): Promise<void> => {
    const { buyOrder, sessionId, amount, returnUrl } = req.body;

    try {
        const response = await webpayService.createTransaction(buyOrder, sessionId, amount, returnUrl);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create transaction' });
    }
};

export const commitTransaction = async (req: Request, res: Response): Promise<void> => {
    const { token } = req.body;

    try {
        const response = await webpayService.commitTransaction(token);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: 'Failed to commit transaction' });
    }
};