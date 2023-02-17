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

const getProductByName = async (req, res) => {
  const { q } = req.query;
  const { type, message } = await productsService.getByName(q);
  if (type) return res.status(errorCode(type)).json({ message });

  return res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsService.insertProduct(name);
  if (type) return res.status(errorCode(type)).json({ message });
  
  return res.status(201).json(message);
};

const updateProductName = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { type, message } = await productsService
    .updateProduct({ productId: id, productName: name });
  
  if (type) return res.status(errorCode(type)).json({ message });
  
  return res.status(200).json(message);
};

const removeProduct = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productsService.removeProduct(id);
  if (type) return res.status(errorCode(type)).json({ message });

  return res.status(204).end();
};

module.exports = {
  listProducts,
  getProduct,
  getProductByName,
  createProduct,
  updateProductName,
  removeProduct,
};