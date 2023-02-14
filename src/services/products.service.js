const { productsModel } = require('../models');
const { validateProduct } = require('./validations/validateNameValue');
const getProductsId = require('../utils/productExist');

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
  const error = validateProduct(productName);
  if (error.type) return error;

  const productId = await productsModel.insertProduct(productName);
  const newProduct = await productsModel.getById(productId);
  return { type: null, message: newProduct };
};

const updateProduct = async ({ productId, productName }) => {
  const error = validateProduct(productName);
  if (error.type) return error;

  const productsIds = await getProductsId();
  const validate = productsIds.includes(Number(productId));
  if (!validate) return { type: 'NOT_FOUND', message: 'Product not found' };

  await productsModel.updateProduct({ productId, productName });
  const product = await productsModel.getById(productId);
  return { type: null, message: product };
};

module.exports = {
  getAll,
  getById,
  updateProduct,
  insertProduct,
};