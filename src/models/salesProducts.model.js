const connection = require('./connection');

const insertNewSaleProduct = async ({ saleId, productId, quantity }) => {
  const result = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );

  return result;
};

const updateSaleProduct = async ({ saleId, productId, quantity }) => {
  const result = await connection.execute(
    'UPDATE StoreManager.sales_products SET quantity =? WHERE sale_id = ? AND product_id = ?',
    [quantity, saleId, productId],
  );

  return result;
};

module.exports = {
  insertNewSaleProduct,
  updateSaleProduct,
};