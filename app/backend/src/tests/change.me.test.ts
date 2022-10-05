import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import UserModel from '../models/UserModels';
import TeamModels from '../models/TeamModels';
import MatchesModel from '../models/MatchesModels';

import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const userMock = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
}

const teamMock = [
  { id: 1, teamName: 'Botafogo' },
  { id: 2, teamName: 'Corinthians' },
  { id: 3, teamName: 'Palmeiras' },
]

const matchesMock = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: { id: 16, teamName: "São Paulo" },
    teamAway: { id: 8, teamName: "Grêmio" },
  },
  {
    id: 2,
    homeTeam: 9,
    homeTeamGoals: 1,
    awayTeam: 14,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: { id: 9, teamName: "Internacional" },
    teamAway: { id: 14, teamName: "Santos" },
  },
];

// Testando User e Login:
describe('Teste a rota POST /login', () => {
  it('Teste a rota /login em caso de sucesso', async () => {
    const result = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
    });

    expect(result.status).to.equal(200);
    expect(result.body).to.have.property('token');
  });

  it('Teste a rota /login em caso de falha', async () => {
    const result = await chai.request(app).post('/login').send({
      email: 'teste@teste.com',
      password: '123123',
    });

    expect(result.status).to.equal(401);
    expect(result.body).to.have.key('message');
    expect(result.body.message).to.equal('Incorrect email or password');
  });

  it('Teste a rota /login quando email ou password estiver vazio', async () => {
    const result = await chai.request(app).post('/login').send({
      email: '',
      password: '',
    });

    expect(result.status).to.equal(400);
    expect(result.body).to.have.key('message');
    expect(result.body.message).to.equal('All fields must be filled');
  });

  it('Teste a rota /login em caso de apenas email vazio', async () => {
    const result = await chai.request(app).post('/login').send({
      email: '',
      password: '123123',
    });

    expect(result.status).to.equal(400);
    expect(result.body).to.be.a('object');
    expect(result.body).to.have.key('message');
    expect(result.body.message).to.equal('All fields must be filled');
  });

  it('Teste a rota /login em caso de email inválido', async () => {
    const result = await chai.request(app).post('/login').send({
      email: 'emailInvalidation',
      password: '123123',
    });

    expect(result.status).to.equal(400);
    expect(result.body).to.be.a('object');
    expect(result.body).to.have.key('message');
    expect(result.body.message).to.equal('All fields must be filled');
  });

  it('Teste a rota /login em caso de password inválido', async () => {
    const result = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: '123',
    });

    expect(result.status).to.equal(400);
    expect(result.body).to.be.a('object');
    expect(result.body).to.have.key('message');
    expect(result.body.message).to.equal('All fields must be filled');
  });

  it('Teste a rota POST /login em caso de usuário inexistente', async () => {
    const result = await chai.request(app).post('/login').send({
      email: 'admin35@admin.com',
      password: '123123',
    });

    expect(result.status).to.equal(401);
    expect(result.body).to.be.a('object');
    expect(result.body).to.have.key('message');
    expect(result.body.message).to.equal('Incorrect email or password');
  });
});

// Testando ValidationToken:
describe('Teste a rota GET /validate', () => {
  beforeEach(async () => {
    sinon
      .stub(jwt, 'verify')
      .callsFake(() => {
        return Promise.resolve({ sucess: 'Token is valid' });
      });
    sinon.stub(UserModel.prototype, 'findOne')
    .resolves(userMock);
  });

  afterEach(() => {
    (UserModel.prototype.findOne as sinon.SinonStub).restore();
    (jwt.verify as sinon.SinonStub).restore();
  });

  it('Teste a validação em caso de sucesso', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY2NDUwNDc4MCwiZXhwIjoxNjY0NTkxMTgwfQ.lYN2ImWYl-ejFGAMEClZzcFS6I3Bx4PX2lfS47v9rus';
    const result = await chai.request(app).get('/login/validate').set('authorization', token);

    expect(result.status).to.equal(200);
    expect(result.body).to.have.property('role');
    expect(result.body.role).to.be.equal('admin');
  });

  it('Teste a a validação em caso de usuário ser o Administrador', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY2NDUwNDc4MCwiZXhwIjoxNjY0NTkxMTgwfQ.lYN2ImWYl-ejFGAMEClZzcFS6I3Bx4PX2lfS47v9rus';
    const result = await chai.request(app).get('/login/validate').set('authorization', token);

    expect(result.status).to.equal(200);
    expect(result.body).to.have.property('role');
    expect(result.body.role).to.be.equal('admin');
  });
});

// Testando Teams - sucesso:
describe('Teste a rota GET /teams', () => {
  beforeEach( async () => {
    return sinon
      .stub(TeamModels.prototype, "findAll")
      .resolves(teamMock);
  });

  afterEach(() => {
    (TeamModels.prototype.findAll as sinon.SinonStub).restore();
  });

  it('Teste a listagem de todos os times com sucesso', async () => {
    const result = await chai.request(app).get('/teams');
    expect(result.status).to.equal(200);
    expect(result.body).to.be.an('array');
  });
});

// Testando Teams - falha -usar mock null:
describe('Teste a rota GET /teams', () => {
  beforeEach( async () => {
    return sinon
      .stub(TeamModels.prototype, "findAll")
      .resolves(null);
  });

  afterEach(() => {
    (TeamModels.prototype.findAll as sinon.SinonStub).restore();
  });

  it('Teste a listagem de todos os times com falha', async () => {
    const result = await chai.request(app).get('/teams');
    expect(result.status).to.equal(404);
    expect(result.body).to.be.an('object');
    expect(result.body.message).to.be.equal('No teams found');
  });
});

// Testando Teams pelo ID - sucesso:
describe('Teste a rota GET /teams: id ', () => {
  beforeEach( async () => {
    sinon
      .stub(TeamModels.prototype, 'findOne')
      .resolves(teamMock[0]);
  });

  afterEach(() => {
    (TeamModels.prototype.findOne as sinon.SinonStub).restore();
  });

  it('Teste a listagem de todos os times pelo Id em caso de sucesso', async () => {
    const result = await chai.request(app).get('/teams/1');
    expect(result.status).to.equal(200);
    expect(result.body).to.be.an('object');
    expect(result.body.teamName).to.be.equal('Botafogo')
  });
});

// Testando Teams pelo ID - falha - usar mock null::
describe('Teste a rota GET /teams: id ', () => {
  beforeEach( async () => {
    sinon
      .stub(TeamModels.prototype, 'findOne')
      .resolves(null);
  });

  afterEach(() => {
    (TeamModels.prototype.findOne as sinon.SinonStub).restore();
  });

  // it('Teste a listagem de todos os times pelo Id em caso de erro', async () => {
  //   const result = await chai.request(app).get('/teams/1');
  //   expect(result.status).to.equal(404);
  //   expect(result.body.message).to.be.equal('No teams found');
  // });
});

// Testando GET/Matches - em caso de sucesso:
describe('Teste a rota GET/macthes ', () => {
  beforeEach( async () => {
    sinon
      .stub(MatchesModel.prototype, 'findAll')
      .resolves(matchesMock);
  });

  afterEach(() => {
    (MatchesModel.prototype.findAll as sinon.SinonStub).restore();
  });

  it('Teste a rota GET/matches em caso de sucesso', async () => {
    const result = await chai.request(app).get('/matches');
    expect(result.status).to.equal(200);
    expect(result.body).to.be.a('array');
    expect(result.body).to.deep.equal(matchesMock);
  });
});

// Testando GET/Matches - em caso de falha:
describe('Teste a rota GET/macthes ', () => {
  beforeEach( async () => {
    sinon
      .stub(MatchesModel.prototype, 'findAll')
      .resolves(null);
  });

  afterEach(() => {
    (MatchesModel.prototype.findAll as sinon.SinonStub).restore();
  });

  it('Teste a rota GET/matches em caso de falha', async () => {
    const result = await chai.request(app).get('/matches');
    expect(result.status).to.equal(404);
    expect(result.body).to.be.a('object');
    expect(result.body).to.deep.equal({ message: 'No matches found' });
  });
});

// Testando PATCH/Matches - em caso de sucesso:
describe('Teste a rota PATCH/macthes ', () => {
  beforeEach( async () => {
    sinon
      .stub(MatchesModel.prototype, 'updateGoals')
      .resolves();
  });

  afterEach(() => {
    (MatchesModel.prototype.updateGoals as sinon.SinonStub).restore();
  });

  it('Teste a rota PATCH/matches em caso de sucesso', async () => {
    const result = await chai.request(app).patch('/matches/1');
    expect(result.status).to.equal(200);
    expect(result.body).to.have.property('message');
  });
});
