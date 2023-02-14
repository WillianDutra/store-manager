const errors = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INVALID_VALUE: 422,
};

const errorCode = (type) => errors[type] || 500;

module.exports = errorCode;