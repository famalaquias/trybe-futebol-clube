import TeamModel from '../models/TeamModels';

export default class TeamService {
  constructor(private model: TeamModel = new TeamModel()) {}

  public async findAll() {
    const team = await this.model.findAll();

    if (!team) {
      return { code: 404, message: 'No teams found' };
    }

    return { code: 200, data: team };
  }

  public async findOne(id: number) {
    const team = await this.model.findOne(id);

    if (!team) {
      return { code: 404, message: 'No teams found by id' };
    }

    return { code: 200, data: team };
  }
}
