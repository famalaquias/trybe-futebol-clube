import LeaderboardModel from '../models/LeaderboardModels';
import { ILeaderboardHomeAway } from '../interfaces/ILeaderboard';
import { board, sortLeaderboard } from '../utils/leaderboardHome';

export default class LeaderboardService {
  constructor(
    private model: LeaderboardModel = new LeaderboardModel(),
  ) {}

  // GET/leaderboard/home:
  public async findAll() {
    const leader = await this.model.findAll() as unknown as ILeaderboardHomeAway[];

    if (!leader) {
      return { code: 404, message: 'No leader found' };
    }

    const result = board(leader);
    const sortLeader = sortLeaderboard(result);

    return { code: 200, data: sortLeader };
  }
}
