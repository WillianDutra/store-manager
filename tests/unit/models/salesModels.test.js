const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { allSales, salesFiltered } = require('./mocks/sales.model.mock')

describe('Testes unitarios da camada model de sales', function () {
  it('Recuperando lista de sales', async function () {
    sinon.stub(connection, 'execute').resolves([allSales]); // mock
    const result = await salesModel.getAll();
    expect(result).to.be.deep.equal(allSales); // mock
  });

  it('Recuperando lista de vendas filtrada por Id', async function () {
    sinon.stub(connection, 'execute').resolves([salesFiltered]);
    const result = await salesModel.getById(1);
    expect(result).to.be.deep.equal(salesFiltered);
  });

  it('Inserindo nova venda a tabela', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 5 }]);
    const result = await salesModel.insertNewSale();
    expect(result).to.be.equal(5);
  });

  afterEach(function () {
    sinon.restore();
  });
});