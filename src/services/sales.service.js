const { salesModel, productsModel, salesProductsModel } = require('../models');
const { validateQuantity } = require('./validations/validateQuantityValue');

const productExist = async (saleId) => {
  const sale = await productsModel.getById(saleId);
  if (sale) return true;
  return false;
};

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
  const [validateError] = salesProducts.map(async (sale) => {
    const error = validateQuantity(sale.quantity);
    if (error.type) return error;

    const exist = await productExist(sale.productId);
    if (!exist) return { type: 'NOT_FOUND', message: 'Product not found' };
  });

  if (validateError) return validateError;

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