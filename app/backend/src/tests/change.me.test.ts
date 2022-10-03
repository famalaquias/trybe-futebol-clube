import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const userMock = [{
  "id": 1,
  "teamName": "Avaí/Kindermann"
}]
   
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
      // userMock
      email: 'admin@admin.com',
      password: 'secret_admin',
    });

    expect(result.status).to.equal(200);
  });

  it('Teste a rota POST /login com falha', async () => {
    const result = await chai.request(app).post('/login').send({
      // userMock
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
});

describe('Teste a rota GET /teams', () => {
  beforeEach(() => {
    sinon
      .stub(Team, 'findAll')
      .resolves(userMock as Team[]);
  });

  afterEach(() => {
    (Team.findAll as sinon.SinonStub).restore();
    // sinon.restore();
  });

  //Teste findAll..
  it('Teste a listagem de todos os times', async () => {
    const result = await chai.request(app).post('/teams');
    expect(result.status).to.equal(200);
  });
});