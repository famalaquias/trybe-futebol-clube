import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/MatchesServices';

class MatchesController {
  constructor(private service: MatchesService = new MatchesService()) {
    this.findAll = this.findAll.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.updateGoals = this.updateGoals.bind(this);
  }

  // GET/matches:
  public async findAll(
    req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const matches = await this.service.findAll();
    if (matches.message) {
      return res.status(matches.code).json({ message: matches.message });
    }
    return res.status(matches.code).json(matches.data);
  }

  // POST/matches:
  public async create(
    req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const match = await this.service.create(req.body);
    if (match.message) {
      return res.status(match.code).json({ message: match.message });
    }
    return res.status(match.code).json(match.data);
  }

  // PATCH/matches/:id/finish
  public async update(
    req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const { id } = req.params;

    const matchUpdate = await this.service.update(Number(id));
    if (matchUpdate.message) {
      return res.status(matchUpdate.code).json({ message: matchUpdate.message });
    }
    return res.status(matchUpdate.code).json({ message: matchUpdate.data });
  }

  // PATCH/matches/:id:
  public async updateGoals(
    req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const matchGoals = await this.service.updateGoals(Number(id), homeTeamGoals, awayTeamGoals);

    if (matchGoals.message) {
      return res.status(matchGoals.code).json({ message: matchGoals.message });
    }
    return res.status(matchGoals.code).json(matchGoals.data);
  }
}

export default MatchesController;
