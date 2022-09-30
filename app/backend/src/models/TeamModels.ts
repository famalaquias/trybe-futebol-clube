import ITeam from '../interfaces/ITeam';
import Team from '../database/models/Team';

class TeamModel {
  protected _model = Team;

  public async findAll(): Promise<ITeam[] | null> {
    const result = await this._model.findAll();
    return result;
  }
}

export default TeamModel;
