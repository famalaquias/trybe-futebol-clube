// import IMatches from '../interfaces/IMatches';
// import TeamModel from '../models/TeamModels';
import MatchesModel from '../models/MatchesModels';

export default class MatchesService {
  constructor(private model: MatchesModel = new MatchesModel()) {}

  public async findAll() {
    const matches = await this.model.findAll();

    if (!matches) {
      return { code: 404, message: 'No matches found' };
    }

    return { code: 200, data: matches };
  }
}
