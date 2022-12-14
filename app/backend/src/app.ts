import * as express from 'express';
import middlewareError from './middlewares/middlewareError';
import LoginController from './controllers/LoginControllers';
import loginValidation from './middlewares/loginValidation';
import TeamController from './controllers/TeamControllers';
import MatchesController from './controllers/MatchesControllers';
import LeaderboardController from './controllers/LeaderboardControllers';
import { tokenValidation } from './middlewares/jwt';

const loginControllers = new LoginController();
const teamControllers = new TeamController();
const matchesControllers = new MatchesController();
const leaderboardControllers = new LeaderboardController();

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));

    // Rotas /login:
    this.app.post('/login', loginValidation, (req, res, next) =>
      loginControllers.login(req, res, next)); // outra maneira de fazer: this.app.post('/login', loginValidation, loginControllers.login);
    this.app.get('/login/validate', loginControllers.validateUser);

    // Rotas /teams:
    this.app.get('/teams', teamControllers.findAll);
    this.app.get('/teams/:id', teamControllers.findOne);

    // Rotas /matches:
    this.app.get('/matches', matchesControllers.findAll);
    this.app.post('/matches', tokenValidation, matchesControllers.create);
    this.app.patch('/matches/:id', matchesControllers.updateGoals);
    this.app.patch('/matches/:id/finish', matchesControllers.update);

    // Rotas /leaderboard:
    this.app.get('/leaderboard/home', leaderboardControllers.findAllHome);
    this.app.get('/leaderboard/away', leaderboardControllers.findAllAway);
    // this.app.get('/leaderboard', leaderboardControllers.findAll);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use(middlewareError);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
