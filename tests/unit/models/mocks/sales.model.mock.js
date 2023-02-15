const allSales = [
  {
    "saleId": 1,
    "date": "2023-02-15T18:48:50.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2023-02-15T18:48:50.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2023-02-15T18:48:50.000Z",
    "productId": 3,
    "quantity": 15
  }
];

const salesFiltered = [
  {
    "date": "2023-02-15T18:48:50.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2023-02-15T18:48:50.000Z",
    "productId": 2,
    "quantity": 10
  }
]

module.exports = {
  allSales,
  salesFiltered,
}