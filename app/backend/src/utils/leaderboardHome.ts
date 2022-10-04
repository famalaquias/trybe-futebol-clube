import { ILeaderboardHomeAway, ILeaderboardHome, ILeaderboard } from '../interfaces/ILeaderboard';

const leader = (match: ILeaderboardHome[]) => {
  const goalsFavor = match.reduce((acc: number, mat: ILeaderboardHome) =>
    acc + mat.homeTeamGoals, 0);
  const goalsOwn = match.reduce((acc: number, mat: ILeaderboardHome) => acc + mat.awayTeamGoals, 0);

  const goalsBalance = goalsFavor - goalsOwn;
  return { goalsFavor, goalsOwn, goalsBalance };
};

const calculateMatch = (matches: ILeaderboardHome[]) => {
  let totalVictories = 0;
  let totalLosses = 0;
  let totalDraws = 0;
  let totalPoints = 0;
  matches.forEach((match: ILeaderboardHome) => {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      totalVictories += 1; totalPoints += 3;
    } else if (match.homeTeamGoals < match.awayTeamGoals) {
      totalLosses += 1;
    } else {
      totalDraws += 1; totalPoints += 1;
    }
  });
  return { totalVictories, totalLosses, totalDraws, totalPoints };
};

const totalEfficiency = (P:number, J: number) => {
  const efficiency = (P / (J * 3)) * 100;
  return efficiency;
};

const board = (home: ILeaderboardHomeAway[]) => {
  const newHome = home.map((t) => {
    const name = t.teamName;
    const { totalVictories, totalLosses, totalDraws, totalPoints } = calculateMatch(t.teamHome);
    const totalGames = t.teamHome.length;
    const goalsBalance = leader(t.teamHome);
    const efficiency = totalEfficiency(totalPoints, totalGames);

    return { name,
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      ...goalsBalance,
      efficiency: efficiency.toFixed(2),
    };
  });

  return newHome;
};

const sortLeaderboard = (leaderboard: ILeaderboard[]) => {
  const sortedLeaderboard = leaderboard.sort((a: ILeaderboard, b: ILeaderboard) => {
    if (a.totalPoints < b.totalPoints) return 1;
    if (a.totalPoints > b.totalPoints) return -1;
    if (a.totalVictories < b.totalVictories) return 1;
    if (a.totalVictories > b.totalVictories) return -1;
    if (a.goalsBalance < b.goalsBalance) return 1;
    if (a.goalsBalance > b.goalsBalance) return -1;
    if (a.goalsFavor < b.goalsFavor) return 1;
    if (a.goalsFavor > b.goalsFavor) return -1;
    if (a.goalsOwn < b.goalsOwn) return 1;
    if (a.goalsOwn > b.goalsOwn) return -1;
    return 0;
  });
  return sortedLeaderboard;
};

export { board, sortLeaderboard };
