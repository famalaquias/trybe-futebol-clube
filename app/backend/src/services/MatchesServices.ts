import IMatches from '../interfaces/IMatches';
// import TeamModel from '../models/TeamModels';
import MatchesModel from '../models/MatchesModels';

export default class MatchesService {
  constructor(
    private model: MatchesModel = new MatchesModel(),
    // private teamModel: TeamModel = new TeamModel(),
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
    const match = await this.model.create(matches);

    if (!match) {
      return { code: 404, message: 'Unable to save a match with inProgress status' };
    }

    return { code: 201, data: match };
  }

  // PATCH/matches:
  public async update(id: number) {
    const matchUpdate = await this.model.update(id);

    if (!matchUpdate) {
      return { code: 404, message: 'Unable to change a match inProgress status' };
    }

    return { code: 200, data: 'Finished' };
  }
}
