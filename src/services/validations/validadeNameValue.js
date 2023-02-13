const { productSchema } = require('./schema');

const validateProduct = (productName) => {
  const { error } = productSchema.validate(productName);
  if (error) {
    return { type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' };
  }

  return { type: null, message: '' };
};

module.exports = {
  validateProduct,
};