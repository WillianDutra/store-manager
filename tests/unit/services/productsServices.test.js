const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');

const { allProducts } = require('./mocks/products.service.mock');

describe('Testes unitarios da service de produtos', function () {
  describe('Testando retorno de getAll', async function () {
    it('Retorna lista completa de produtos', async function () {
      sinon.stub(productsModel, 'getAll').resolves(allProducts)
      const result = await productsService.getAll();
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(allProducts);
    });
  });

  describe('Testando retorno de getById', async function () {
    it('Retorna produto filtrado por id', async function () {
      sinon.stub(productsModel, 'getById').resolves(allProducts[0]);
      const result = await productsService.getById(1);
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(allProducts[0]);
    });
    
    it('Retorna erro caso id seja invalido', async function () {
      sinon.stub(productsModel, 'getById').resolves();
      const result = await productsService.getById(999999);
      expect(result.type).to.be.equal('NOT_FOUND');
      expect(result.message).to.be.equal('Product not found');
    });
  });

  describe('Testando retorno de insertProduct', async function () {
    it('Retorna erro caso name tenha menos de 5 caracteres', async function () {
      const result = await productsService.insertProduct('1234');
      expect(result.type).to.be.equal('INVALID_VALUE');
      expect(result.message).to.be.equal('"name" length must be at least 5 characters long');
    });

    it('Retorna o produto atualizado', async function () {
      sinon.stub(productsModel, 'insertProduct').resolves(1);
      sinon.stub(productsModel, 'getById').resolves({id: 1, name: 'Teste'});

      const result = await productsService.insertProduct('Teste');

      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal({ id: 1, name: 'Teste' });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});