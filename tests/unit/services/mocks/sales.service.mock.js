const allSales = [
  {
    "saleId": 1,
    "date": "2023-02-15T18:48:50.000Z",
    "productId": 1,
    "quantity": 5
  }
];

const filteredSale = [
  {
    "date": "2023-02-15T19:15:25.000Z",
    "productId": 1,
    "quantity": 5
  }
];

const NOT_FOUND = 'NOT_FOUND';
const SALE_MESSAGE = 'Sale not found';

module.exports = {
  allSales,
  filteredSale,
  NOT_FOUND,
  SALE_MESSAGE,
};