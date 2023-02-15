const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { allProducts, productsUpdate } = require('./mocks/products.model.mock')

describe('Testes unitarios da model de produtos', function () {
  it('Recuperando lista de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts])
    const result = await productsModel.getAll();
    expect(result).to.be.deep.equal(allProducts);
  });

  it('Retorna o produto filtrado pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([[allProducts[0]]]);
    const result = await productsModel.getById(1);
    expect(result).to.be.deep.equal(allProducts[0]);
  });

  it('Retorna o insertId ao realizar a operação INSERT', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 5 }]);
    const result = await productsModel.insertProduct('Teste');
    expect(result).to.be.equal(5);
  });

  it('Realiza a operação UPDATE', async function () {
    sinon.stub(connection, 'execute').resolves(productsUpdate);
    const result = await productsModel.updateProduct({ productId: 1, productName: 'Testando' })
    expect(result[0].affectedRows).to.be.deep.equal(1);
    expect(result[0].changedRows).to.be.deep.equal(1);
  });

  afterEach(function () {
    sinon.restore();
  });
});