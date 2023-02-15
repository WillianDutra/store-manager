const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id',
  );
  return result;
};

const getById = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return result;
};

const insertProduct = async (productName) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [productName],
  );
  return insertId;
};

const updateProduct = async ({ productId, productName }) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [productName, productId],
  );
};

const removeProduct = async (productId) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [productId],
  );
};

module.exports = {
  getAll,
  getById,
  insertProduct,
  updateProduct,
  removeProduct,
};