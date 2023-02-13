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

const insertProduct = async (productName) => {
  const productId = await productsModel.insertProduct(productName);
  const newProduct = await productsModel.getById(productId);
  return { type: null, message: newProduct };
};

module.exports = {
  getAll,
  getById,
  insertProduct,
};