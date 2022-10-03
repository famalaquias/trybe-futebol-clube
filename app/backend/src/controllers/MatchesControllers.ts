import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/MatchesServices';

class MatchesController {
  constructor(private service: MatchesService = new MatchesService()) {
    this.findAll = this.findAll.bind(this);
    this.create = this.create.bind(this);
  }

  // GET/matche:
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

  // PATCH/matches:
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
    return res.status(matchUpdate.code).json(matchUpdate.data);
  }
}

export default MatchesController;
