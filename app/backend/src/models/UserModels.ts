import { IUser } from '../interfaces/IUser';
import User from '../database/models/User';

class UserModel {
  protected _model = User;

  public async findOne(email: string): Promise<IUser | null> {
    const result = await this._model.findOne({
      where: { email },
    });

    return result;
  }
}

export default UserModel;
