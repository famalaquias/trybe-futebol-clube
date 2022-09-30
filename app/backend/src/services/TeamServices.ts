import TeamModel from '../models/TeamModels';

export default class TeamService {
  constructor(private model: TeamModel = new TeamModel()) {}

  public async findAll() {
    const team = await this.model.findAll();

    if (!team) {
      return { code: 404, message: 'No team found' };
    }

    return { code: 200, data: team };
  }
}
