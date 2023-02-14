const { salesService } = require('../services');
const errorCode = require('../utils/errorCode');

const listSales = async (_req, res) => {
  const { type, message } = await salesService.getAll();
  if (type) return res.status(errorCode(type)).json(message);

  return res.status(200).json(message);
};

const getSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getById(id);
  if (type) return res.status(errorCode(type)).json({ message });
  
  return res.status(200).json(message);
};

const createSale = async (req, res) => {
  const sales = req.body;
  const { type, message } = await salesService.insertNewSale(sales);
  if (type) return res.status(errorCode(type)).json({ message });

  return res.status(201).json(message);
};

module.exports = {
  listSales,
  getSale,
  createSale,
};