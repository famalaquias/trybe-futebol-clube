import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { ILogin } from '../interfaces/ILogin';
import LoginService from '../services/LoginServices';
import UserModel from '../models/UserModels';
import { IUser } from '../interfaces/IUser';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

class LoginController {
  constructor(
    private service: LoginService = new LoginService(),
    private model: UserModel = new UserModel(),
  ) {
    this.login = this.login.bind(this);
    this.validateUser = this.validateUser.bind(this);
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

  public async validateUser(
    req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const { authorization: token } = req.headers;

    if (!token) {
      return res.status(404).json({ message: 'Error token' });
    }

    const { email } = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    const { role } = await this.model.findOne(email) as IUser;
    return res.status(200).json({ role });
  }
}

export default LoginController;
