const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { allProducts } = require('./mocks/products.model.mock')

describe('Testes unitarios da model de produtos', function () {
  it('Recuperando lista de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts])
    const result = await productsModel.getAll();
    expect(result).to.be.deep.equal(allProducts);
  });

  it('Recupera produto filtrado pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([[allProducts[0]]]);
    const result = await productsModel.getById(1);
    expect(result).to.be.deep.equal(allProducts[0]);
  });

  afterEach(function () {
    sinon.restore();
  });
});