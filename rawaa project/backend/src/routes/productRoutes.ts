import { Router } from 'express';
import { getProducts, addProduct, deleteProduct,getProductById } from '../controllers/productController';

const router = Router();

router.get('/products', getProducts);
router.post('/products', addProduct);
router.delete('/products/:id', deleteProduct);
router.get('/products/:id', getProductById); // Get product by ID


export default router;
