const Joi = require('joi');

const productSchema = Joi.string().min(5).required();
const quantitySchema = Joi.number().integer().min(1).required();

module.exports = {
  productSchema,
  quantitySchema,
};