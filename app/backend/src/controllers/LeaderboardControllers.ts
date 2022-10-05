import { NextFunction, Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardServices';

class LeaderboardController {
  constructor(private service: LeaderboardService = new LeaderboardService()) {
    this.findAllHome = this.findAllHome.bind(this);
    this.findAllAway = this.findAllAway.bind(this);
  }

  // GET/leaderboard/home:
  public async findAllHome(
    req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const leader = await this.service.findAllHome();
    if (leader.message) {
      return res.status(leader.code).json({ message: leader.message });
    }
    return res.status(leader.code).json(leader.data);
  }

  // GET/leaderboard/away:
  public async findAllAway(
    req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const leader = await this.service.findAllAway();
    if (leader.message) {
      return res.status(leader.code).json({ message: leader.message });
    }
    return res.status(leader.code).json(leader.data);
  }
}

export default LeaderboardController;
