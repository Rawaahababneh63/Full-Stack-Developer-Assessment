"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const router = (0, express_1.Router)();
router.get('/products', productController_1.getProducts);
router.post('/products', productController_1.addProduct);
router.delete('/products/:id', productController_1.deleteProduct);
exports.default = router;
