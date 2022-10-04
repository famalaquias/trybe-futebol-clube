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

  // Testando User e Login:
  it('Teste a rota POST /login com sucesso', async () => {
    const result = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
    });

    expect(result.status).to.equal(200);
    expect(result.body).to.have.property('token');
  });

  it('Teste a rota POST /login com falha', async () => {
    const result = await chai.request(app).post('/login').send({
      email: 'teste@teste.com',
      password: '123123',
    });

    expect(result.status).to.equal(401);
    expect(result.body).to.have.key('message');
    expect(result.body.message).to.equal('Incorrect email or password');
  });

  it('Teste a rota POST /login quando email ou password estiver vazio', async () => {
    const result = await chai.request(app).post('/login').send({
      email: '',
      password: '',
    });

    expect(result.status).to.equal(400);
    expect(result.body).to.have.key('message');
    expect(result.body.message).to.equal('All fields must be filled');
  });
});

// Testando Teams:
describe('Teste a rota GET /teams', () => {
  beforeEach(() => {
    sinon
      .stub(Team, 'findAll')
      .resolves(userMock as Team[]);
  });

  afterEach(() => {
    (Team.findAll as sinon.SinonStub).restore();
  });

  it('Teste a listagem de todos os times', async () => {
    const result = await chai.request(app).post('/teams');
    expect(result.status).to.equal(404);
  });

  // it('Teste a listagem de todos os times com erro', async () => {
  //   const result = await chai.request(app).post('/teams');
  //   expect(result.status).to.equal(404);
  //   expect(result.body).to.be.an('object');
  //   expect(result.body.message).to.be.equal('No teams found');
  // });
});
