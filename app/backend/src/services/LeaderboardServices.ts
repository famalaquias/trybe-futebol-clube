import LeaderboardModel from '../models/LeaderboardModels';
import { ILeaderboardHomeAway, ILeaderboardAway } from '../interfaces/ILeaderboard';
import { boardHome, sortLeaderboardHome } from '../utils/leaderboardHome';
import { boardAway, sortLeaderboardAway } from '../utils/leaderboardAway';

export default class LeaderboardService {
  constructor(
    private model: LeaderboardModel = new LeaderboardModel(),
  ) {}

  // GET/leaderboard/home:
  public async findAllHome() {
    const leader = await this.model.findAllHome() as unknown as ILeaderboardHomeAway[];

    if (!leader) {
      return { code: 404, message: 'No leader found' };
    }

    const result = boardHome(leader);
    const sortLeader = sortLeaderboardHome(result);

    return { code: 200, data: sortLeader };
  }

  // GET/leaderboard/away:
  public async findAllAway() {
    const leaderAway = await this.model.findAllAway() as unknown as ILeaderboardAway[];

    if (!leaderAway) {
      return { code: 404, message: 'No leader found' };
    }

    const result = boardAway(leaderAway);
    const sortLeader = sortLeaderboardAway(result);

    return { code: 200, data: sortLeader };
  }

  // GET/leaderboard:
  // public async findAll() {
  //   const dataHome = await this.findAllHome() as unknown as ILeaderboardHomeAway[];
  //   const dataAway = await this.findAllAway() as unknown as ILeaderboardAway[];

  //   if (!dataHome || !dataAway) {
  //     return { code: 404, message: 'No data found' };
  //   }

  //   const resultAway = boardAway(dataAway);
  //   const resultHome = boardHome(dataHome);

  //   const result = resultAway.map((away) => (resultHome.map((home) => {
  //     const { name } = away;
  //     const efficiency = away.efficiency + home.efficiency;
  //     return { name, efficiency };
  //   })));

  //   const sortLeader = sortLeaderboardAway(result);

  //   return { code: 200, data: sortLeader };
  // }
}
