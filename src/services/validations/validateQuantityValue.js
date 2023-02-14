const { quantitySchema } = require('./schema');

const validateQuantity = (quantity) => {
  const { error } = quantitySchema.validate(quantity);
  if (error) {
    return { type: 'INVALID_VALUE', message: '"quantity" must be greater than or equal to 1' };
  }

  return { type: null, message: '' };
};

module.exports = {
  validateQuantity,
};