import { NextFunction, Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardServices';

class LeaderboardController {
  constructor(private service: LeaderboardService = new LeaderboardService()) {
    this.findAll = this.findAll.bind(this);
  }

  // GET/leaderboard/home:
  public async findAll(
    req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const leader = await this.service.findAll();
    if (leader.message) {
      return res.status(leader.code).json({ message: leader.message });
    }
    return res.status(leader.code).json(leader.data);
  }
}

export default LeaderboardController;
