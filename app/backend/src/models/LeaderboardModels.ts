import Matches from '../database/models/Matches';
import Team from '../database/models/Team';

class LeaderboardModel {
  protected _model = Team;

  // GET/leaderboard/home:
  public async findAllHome() {
    const result = await this._model.findAll({
      attributes: {
        exclude: ['id'],
      },

      include: [
        {
          model: Matches,
          as: 'teamHome',
          where: { inProgress: 0 },
        },
      ],
    });

    return result;
  }

  // GET/leaderboard/away:
  public async findAllAway() {
    const result = await this._model.findAll({
      attributes: {
        exclude: ['id'],
      },

      include: [
        {
          model: Matches,
          as: 'teamAway',
          where: { inProgress: 0 },
        },
      ],
    });

    return result;
  }
}

export default LeaderboardModel;
