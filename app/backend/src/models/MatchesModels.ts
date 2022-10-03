import IMatches from '../interfaces/IMatches';
import Matches from '../database/models/Matches';
import Team from '../database/models/Team';

class MatchesModel {
  protected _model = Matches;

  // GET/matches:
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

  // POST/matches:
  public async create(matches: IMatches): Promise<IMatches> {
    const result = await this._model.create({
      homeTeam: matches.homeTeam,
      homeTeamGoals: matches.homeTeamGoals,
      awayTeam: matches.awayTeam,
      awayTeamGoals: matches.awayTeamGoals,
      inProgress: true,
    });

    return result;
  }

  // PATCH/matches/:id/finish:
  public async update(id: number) {
    const result = await this._model.update(
      { inProgress: false },
      { where: { id } },
    );
    return result;
  }

  // PATCH/matches/:id:
  public async updateGoals(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    const result = await this._model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    return result;
  }
}

export default MatchesModel;
