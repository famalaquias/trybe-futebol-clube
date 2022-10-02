import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/TeamServices';

class TeamController {
  constructor(private service: TeamService = new TeamService()) {
    this.findAll = this.findAll.bind(this);
    this.findOne = this.findOne.bind(this);
  }

  public async findAll(
    req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const team = await this.service.findAll();
    if (team.message) {
      return res.status(team.code).json({ message: team.message });
    }
    return res.status(team.code).json(team.data);
  }

  public async findOne(
    req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const { id } = req.params;
    const team = await this.service.findOne(Number(id));
    return res.status(team.code).json(team.data);
  }
}

export default TeamController;
