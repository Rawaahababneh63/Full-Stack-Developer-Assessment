import { Request, Response } from 'express';
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51QgoxTHI8ONCXGGKCyLHt17GzI7xpbosJzNRpNcvksFHYcrEDOxYDYkVGB9OKLPDyco5XQEWeGGnLYQSjcXI7uny00jZYAcXCa', { apiVersion: '2024-12-18.acacia' });

export const createPaymentIntent = async (req: Request, res: Response) => {
    const { amount } = req.body;
  
    // Log the received request data
    console.log('Payment request received:', { amount });
  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: parseInt(amount) * 100, // Convert dollars to cents
        currency: 'usd',
      });
  
      // Log the created PaymentIntent
      console.log('PaymentIntent created successfully:', paymentIntent);
  
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      // Log the error
      console.error('Error creating PaymentIntent:', error);
      res.status(500).json({ error: (error as Error).message });
    }
  };
