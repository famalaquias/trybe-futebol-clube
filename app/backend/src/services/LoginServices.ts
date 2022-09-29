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
}
