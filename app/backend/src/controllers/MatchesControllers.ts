import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/MatchesServices';

class MatchesController {
  constructor(private service: MatchesService = new MatchesService()) {
    this.findAll = this.findAll.bind(this);
  }

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
}

export default MatchesController;
