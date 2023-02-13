const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');

const { allProducts } = require('./mocks/products.service.mock')

describe('Testes unitarios da service de produtos', function () {
  it('Retorna lista completa de produtos', async function () {
    sinon.stub(productsModel, 'getAll').resolves(allProducts)
    const result = await productsService.getAll();
    expect(result.type).to.be.equal(null);
    expect(result.message).to.be.deep.equal(allProducts);
  });

  it('Retorna produto filtrado por id', async function () {
    sinon.stub(productsModel, 'getById').resolves(allProducts[0]);
    const result = await productsService.getById(1);
    expect(result.type).to.be.equal(null);
    expect(result.message).to.be.deep.equal(allProducts[0]);
  });

  afterEach(function () {
    sinon.restore();
  });
});