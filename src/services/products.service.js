const { productsModel } = require('../models');

const getAll = async () => {
  const products = await productsModel.getAll();
  return { type: null, message: products };
};

const getById = async (productId) => {
  const product = await productsModel.getById(productId);
  if (product) return { type: null, message: product };
  return { type: 'NOT_FOUND', message: 'Product not found' };
};

module.exports = {
  getAll,
  getById,
};