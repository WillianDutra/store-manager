const express = require('express');
const { salesController } = require('../controllers');

const validateNewSale = require('../middlewares/validateNewSale');

const router = express.Router();

router.get('/', salesController.listSales);
router.get('/:id', salesController.getSale);
router.post('/', validateNewSale, salesController.createSale);

module.exports = router;