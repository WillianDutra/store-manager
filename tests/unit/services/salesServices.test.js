const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');

const { allSales, filteredSale, NOT_FOUND, SALE_MESSAGE } = require('./mocks/sales.service.mock')

describe('Testes unitarios da camada service de sales', function () {
  it('Listando todas as sales', async function () {
    sinon.stub(salesModel, 'getAll').resolves(allSales)
    const result = await salesService.getAll();
    expect(result.type).to.be.equal(null);
    expect(result.message).to.be.deep.equal(allSales);
  });

  describe('Listando todas as sales filtradas por Id', async function () {
    it('Retorna o resultado esperado sem erros', async function () {
      sinon.stub(salesModel, 'getById').resolves(filteredSale);
      const result = await salesService.getById(1);
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.equal(filteredSale);
    });

    it('Retorna um erro ao informar um Id inexistente', async function () {
      sinon.stub(salesModel, 'getById').resolves([undefined]);
      const result = await salesService.getById(1);
      expect(result.type).to.equal(NOT_FOUND);
      expect(result.message).to.equal(SALE_MESSAGE);
    })
  });

  afterEach(function () {
    sinon.restore();
  });
});