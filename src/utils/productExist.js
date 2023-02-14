const { productsModel } = require('../models');

const getProductsId = async () => {
  const products = await productsModel.getAll();
  const productsIds = products.map((product) => product.id);
  return productsIds;
};

module.exports = getProductsId;