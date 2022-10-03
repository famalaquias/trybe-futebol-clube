import IMatches from '../interfaces/IMatches';
import TeamModel from '../models/TeamModels';
import MatchesModel from '../models/MatchesModels';

export default class MatchesService {
  constructor(
    private model: MatchesModel = new MatchesModel(),
    private teamModel: TeamModel = new TeamModel(),
  ) {}

  // GET/matches:
  public async findAll() {
    const matches = await this.model.findAll();

    if (!matches) {
      return { code: 404, message: 'No matches found' };
    }

    return { code: 200, data: matches };
  }

  // POST/matches:
  public async create(matches: IMatches) {
    // const { homeTeam, awayTeam } = matches;
    const homeTeam = await this.teamModel.findOne(matches.homeTeam);
    const awayTeam = await this.teamModel.findOne(matches.awayTeam);

    // não é possível inserir uma partida com times iguais.
    if (matches.homeTeam === matches.awayTeam) {
      return { code: 401, message: 'It is not possible to create a match with two equal teams' };
    }

    // não é possível inserir uma partida com times que não existe na tabela.
    if (!homeTeam || !awayTeam) {
      return { code: 404, message: 'There is no team with such id!' };
    }

    const match = await this.model.create(matches);
    return { code: 201, data: match };
  }

  // PATCH/matches/:id/finish:
  public async update(id: number) {
    const matchUpdate = await this.model.update(id);

    if (!matchUpdate) {
      return { code: 404, message: 'Unable to change a match inProgress status' };
    }

    return { code: 200, data: 'Finished' };
  }

  // PATCH/matches/:id:
  public async updateGoals(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    const matchGoals = await this.model.updateGoals(id, homeTeamGoals, awayTeamGoals);

    if (!matchGoals) {
      return { code: 404, message: 'Unable to update matches in progress' };
    }

    return { code: 200, data: { homeTeamGoals, awayTeamGoals } };
  }
}
