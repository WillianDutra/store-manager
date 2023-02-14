const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    `SELECT sa.id AS saleId, sa.date, sp.product_id AS productId, sp.quantity
      FROM StoreManager.sales AS sa
      INNER JOIN StoreManager.sales_products AS sp
      ON sa.id = sp.sale_id`,
  );

  return result;
};

const getById = async (saleId) => {
  const [result] = await connection.execute(
    `SELECT sa.date, sp.product_id AS productId, sp.quantity
      FROM StoreManager.sales AS sa
      INNER JOIN StoreManager.sales_products AS sp
      ON sa.id = sp.sale_id
      WHERE sa.id = (?)`,
    [saleId],
  );

  return result;
};

const insertNewSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  
  return insertId;
};

module.exports = {
  getAll,
  getById,
  insertNewSale,
};