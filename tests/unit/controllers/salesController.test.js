const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai')
const { expect } = require('chai');

chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');

const { allSales, filteredSale, NOT_FOUND, SALE_MESSAGE } = require('./mocks/sales.controller.mocks')

describe('Testes unitarios da camada controller de sales', function () {
  it('Retorna o status 200 e a lista de sales', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'getAll')
      .resolves({ type: null, message: allSales });
    
    await salesController.listSales(req, res);
    
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allSales);
  });

  describe('Listando as sales filtradas por Id', async function () {
    it('Retorna o status 200 e sale corretamente', async function () {
      const res = {};
      const req = { params: { id: 1 }};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'getById')
        .resolves({ type: null, message: filteredSale});
      
      await salesController.getSale(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(filteredSale);
    });

    it('Retorna o status 404 e mensagem de erro', async function () {
      const res = {};
      const req = { params: { id: 99999 } };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().resolves();
      sinon.stub(salesService, 'getById')
        .resolves({ type: NOT_FOUND, message: SALE_MESSAGE });
      
      await salesController.getSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({message: SALE_MESSAGE});
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});