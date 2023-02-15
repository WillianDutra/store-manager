const express = require('express');
const { productsController } = require('../controllers');
const validateNewProducts = require('../middlewares/validateNewProduct');

const router = express.Router();

router.get('/', productsController.listProducts);
router.get('/:id', productsController.getProduct);
router.post('/', validateNewProducts, productsController.createProduct);
router.put('/:id', validateNewProducts, productsController.updateProductName);
router.delete('/:id', productsController.removeProduct);

module.exports = router;