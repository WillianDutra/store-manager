const errors = {
  NOT_FOUND: 404,
  INVALID_VALUE: 422,
};

const errorCode = (type) => errors[type] || 500;

module.exports = errorCode;