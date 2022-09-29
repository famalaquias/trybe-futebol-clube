import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  // Teste rota POST /login..
  it('Teste a rota POST /login com sucesso', async () => {
    const result = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: '123123',
    });

    expect(result.status).to.equal(200);
  });

  it('Teste a rota POST /login com falha', async () => {
    const result = await chai.request(app).post('/login').send({
      email: 'teste@teste.com',
      password: '123123',
    });

    expect(result.status).to.equal(401);
    expect(result.body).to.have.key('message');
  });

  it('Teste a rota POST /login com falha em email ou password', async () => {
    const result = await chai.request(app).post('/login').send({
      email: '',
      password: '',
    });

    expect(result.status).to.equal(400);
    expect(result.body).to.have.key('message');
  });

  // Teste rota GET /login/validate..
  it('Teste a rota GET /login/validate com sucesso', async () => {
    const result = await chai.request(app).get('/login/validate').send({
      email: 'admin@admin.com',
      password: '123123',
    });

    expect(result.status).to.equal(200);
  });

  it('Teste a rota GET /login/validate com falha', async () => {
    const result = await chai.request(app).get('/login/validate').send({
      email: 'teste@teste.com',
      password: '123123',
    });

    expect(result.status).to.equal(401);
    expect(result.body).to.have.key('message');
  });

  it('Teste a rota GET /login/validate com falha em email ou password', async () => {
    const result = await chai.request(app).get('/login/validate').send({
      email: '',
      password: '',
    });

    expect(result.status).to.equal(400);
    expect(result.body).to.have.key('message');
  });

  // it('Seu sub-teste', () => {
  //   expect(false).to.be.eq(true);
  // });
});
