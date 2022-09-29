import * as express from 'express';
import middlewareError from './middlewares/middlewareError';
import UserController from './controllers/LoginControllers';
import loginValidation from './middlewares/loginValidation';

const userControllers = new UserController();

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.post('/login', loginValidation, userControllers.login); // outra maneira de fazer: // this.app.post('/login', loginValidation, (req, res, next) => userControllers.login(req, res, next));
    // this.app.post('/login/validate', userControllers.validateUser);
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
