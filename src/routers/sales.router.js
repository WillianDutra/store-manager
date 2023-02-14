const express = require('express');
const { salesController } = require('../controllers');

const validateNewSale = require('../middlewares/validateNewSale');

const router = express.Router();

router.get('/', salesController.listSales);
router.post('/', validateNewSale, salesController.createSale);
router.get('/:id', salesController.getSale);

module.exports = router;