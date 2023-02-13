const errors = {
  NOT_FOUND: 404,
};

const errorCode = (type) => errors[type] || 500;

module.exports = errorCode;