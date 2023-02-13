const { productsService } = require('../services');
const errorCode = require('../utils/errorCode');

const listProducts = async (_req, res) => {
  const { type, message } = await productsService.getAll();
  if (type) return res.status(errorCode(type)).json(message);

  return res.status(200).json(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getById(id);
  if (type) return res.status(errorCode(type)).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  listProducts,
  getProduct,
};