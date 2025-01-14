import express, { Application } from 'express';
import bodyParser from 'body-parser';
import productRoutes from './routes/productRoutes';
import paymentRoutes from './routes/paymentRoutes';
const app: Application = express();
import cors from 'cors';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

app.use(
  cors({
    origin: '*', // Allows all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  })
);

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', productRoutes);
app.use('/api', paymentRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
