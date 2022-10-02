import ITeam from '../interfaces/ITeam';
import Team from '../database/models/Team';

class TeamModel {
  protected _model = Team;

  // findAll: traz um array de times, ou seja, todos os times.
  public async findAll(): Promise<ITeam[] | null> {
    const result = await this._model.findAll();
    return result;
  }

  // findByPk: traz apenas um time baseado na chave-primária da tabela, ou seja, no ID.
  // referência: https://www.luiztools.com.br/post/tutorial-de-crud-com-node-js-sequelize-e-mysql/
  public async findOne(id: number): Promise<ITeam | null> {
    const result = await this._model.findByPk(id);
    return result;
  }
}

export default TeamModel;
