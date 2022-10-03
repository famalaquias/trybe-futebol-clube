import IMatches from '../interfaces/IMatches';
import Matches from '../database/models/Matches';
import Team from '../database/models/Team';

class MatchesModel {
  protected _model = Matches;

  public async findAll(): Promise<IMatches[] | null> {
    const result = await this._model.findAll({
      include: [
        {
          model: Team,
          as: 'teamHome',
          attributes: ['teamName'],
        }, {
          model: Team,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });

    return result;
  }
}

export default MatchesModel;
