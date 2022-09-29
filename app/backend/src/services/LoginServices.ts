import { ILogin } from '../interfaces/ILogin';
import { generateTokenJwt } from '../middlewares/jwt';
import UserModel from '../models/UserModels';

export default class LoginService {
  constructor(private model: UserModel = new UserModel()) {}

  public async login(user: ILogin) {
    const loginUser = await this.model.findOne(user.email);

    if (!loginUser || loginUser === null) {
      return { code: 401, message: 'Incorrect email or password' };
    }

    const token = generateTokenJwt(user.email);
    return { code: 200, token };
  }

  // validationLogin = async (token: string | undefined) => {
  //   if (!token) {
  //     return { code: 401, message: 'Token not found' };
  //   }

  //   try {
  //     const decoded = verifyJwt(token);

  //     const userLogin = await this.model.findOne(decoded.email);

  //     if (!userLogin) {
  //       return { code: 401, message: 'Token error' };
  //     }

  //     return { code: 200, data: userLogin.role };
  //   } catch (error) {
  //     return { code: 401, message: 'Invalid token' };
  //   }
  // };
}
