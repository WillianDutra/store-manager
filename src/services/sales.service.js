const { salesModel, salesProductsModel } = require('../models');
const getProductsId = require('../utils/productExist');

const getAll = async () => {
  const sales = await salesModel.getAll();
  return { type: null, message: sales };
};

const getById = async (saleId) => {
  const sale = await salesModel.getById(saleId);
  if (sale[0]) return { type: null, message: sale };

  return { type: 'NOT_FOUND', message: 'Sale not found' };
};

const insertNewSale = async (salesProducts) => {
  const salesIds = await getProductsId();
  const validateError = salesProducts.every(({ productId }) => salesIds.includes(productId));
  if (!validateError) return { type: 'NOT_FOUND', message: 'Product not found' };

  const saleId = await salesModel.insertNewSale();
  await salesProducts.map(async ({ quantity, productId }) => {
    await salesProductsModel.insertNewSaleProduct({ saleId, productId, quantity });
  });

  return { type: null, message: { id: saleId, itemsSold: salesProducts } };
};
 
module.exports = {
  getAll,
  getById,
  insertNewSale,
};