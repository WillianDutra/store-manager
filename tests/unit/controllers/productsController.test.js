const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai')
const { expect } = require('chai');

chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');

const { allProducts, filteredProduct } = require('./mocks/products.controller.mock');

describe('Testes unitarios da controller de produtos', function () {
  it('Retorna o status 200 e a lista de produtos', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getAll')
      .resolves({ type: null, message: allProducts})

    await productsController.listProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProducts);
  });

  it('Retorna o status 200 e o produto filtrado por id', async function () {
    const res = {};
    const req = { params: { id: 1}};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getById')
      .resolves({ type: null, message: filteredProduct})

    await productsController.getProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(filteredProduct);
  });

  afterEach(function () {
    sinon.restore();
  });
});