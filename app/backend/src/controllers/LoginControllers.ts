import { NextFunction, Request, Response } from 'express';
import { ILogin } from '../interfaces/ILogin';
import LoginService from '../services/LoginServices';

class LoginController {
  constructor(private service: LoginService = new LoginService()) {
    this.login = this.login.bind(this);
  }

  public async login(
    req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const user = req.body as ILogin;
    const result = await this.service.login(user);

    if (result.code === 200) {
      return res.status(result.code).json({ token: result.token });
    }
    return res.status(result.code).json({ message: result.message });
  }

  // public async validateUser(
  //   req: Request,
  //   res: Response,
  //   _next: NextFunction,
  // ) {
  //   const { authorization } = req.headers;


  // }
}

export default LoginController;
