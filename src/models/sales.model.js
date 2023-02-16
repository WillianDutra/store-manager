const connection = require('./connection');

const getSalesIds = async () => {
  const [result] = await connection.execute(
    'SELECT id FROM StoreManager.sales',
  );

  return result;
};

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

const deleteSale = async (saleId) => {
  await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [saleId],
  );
};

module.exports = {
  getSalesIds,
  getAll,
  getById,
  insertNewSale,
  deleteSale,
};