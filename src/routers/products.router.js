const express = require('express');
const { productsController } = require('../controllers');
const validateNewProducts = require('../middlewares/validateNewProduct');

const router = express.Router();

router.get('/', productsController.listProducts);
router.get('/:id', productsController.getProduct);
router.post('/', validateNewProducts, productsController.createProduct);

module.exports = router;