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

const updateSaleProduct = async (saleId, updateData) => {
  const salesIds = await salesModel.getSalesIds();
  const validate = salesIds.some((sale) => sale.id === Number(saleId));
  if (!validate) return { type: 'NOT_FOUND', message: 'Sale not found' };

  const productsIds = await getProductsId();
  const validateError = updateData.every(({ productId }) => productsIds.includes(productId));
  if (!validateError) return { type: 'NOT_FOUND', message: 'Product not found' };

  await updateData.map(async ({ quantity, productId }) => {
    await salesProductsModel.updateSaleProduct({ saleId, productId, quantity });
  });

  return { type: null, message: { saleId, itemsUpdated: updateData } };
};

const deleteSale = async (saleId) => {
  const salesIds = await salesModel.getSalesIds();
  const validate = salesIds.some((sale) => sale.id === Number(saleId));
  if (!validate) return { type: 'NOT_FOUND', message: 'Sale not found' };

  await salesModel.deleteSale(saleId);
  return { type: null, message: '' };
};
 
module.exports = {
  getAll,
  getById,
  insertNewSale,
  updateSaleProduct,
  deleteSale,
};