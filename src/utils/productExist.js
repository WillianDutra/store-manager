const { productsModel } = require('../models');

const productExist = async (saleId) => {
  const sale = await productsModel.getById(saleId);
  if (sale) return true;
  return false;
};

module.exports = productExist;