// import { ILeaderboard } from '../interfaces/ILeaderboard';

// const leader = (teamHome: ILeaderboard, teamAway: ILeaderboard) => {
//   const goalsFavor = teamHome.goalsFavor + teamAway.goalsFavor;

//   const goalsOwn = teamHome.goalsOwn + teamAway.goalsOwn;

//   const goalsBalance = goalsFavor - goalsOwn;

//   return { goalsFavor, goalsOwn, goalsBalance };
// };

// const calculateMatch = (teamHome: ILeaderboard, teamAway: ILeaderboard) => {
//   const totalVictories = teamHome.totalVictories + teamAway.totalVictories;
//   const totalDraws = teamHome.totalDraws + teamAway.totalDraws;
//   const totalLosses = teamHome.totalLosses + teamAway.totalLosses;
//   const totalPoints = teamHome.totalPoints + teamAway.totalPoints;
//   return { totalVictories, totalLosses, totalDraws, totalPoints };
// };

// const totalEfficiency = (teamHome: ILeaderboard, teamAway: ILeaderboard) => {
//   const P = teamHome.totalPoints + teamAway.totalPoints;
//   const J = teamHome.totalGames + teamAway.totalGames;
//   const efficiency = (P / (J * 3)) * 100;
//   return efficiency;
// };

// const board = (dataHome: ILeaderboard[], dataAway: ILeaderboard[]) => {
//   dataHome.map((datHome: any) => {
//     const data = dataAway.find((dat:ILeaderboard) => dat.name === datHome.name);
//     const { goalsFavor, goalsOwn, goalsBalance } = leader(datHome, data);
//     const efficiency = totalEfficiency(datHome, datAway);
// });
//    return { name,
// totalPoints,
// totalGames,
// totalVictories,
// totalDraws,
// totalLosses,
// ...goalsBalance,
// efficiency: efficiency.toFixed(2),
// };
// };

// const sortLeaderboard = (leaderboard: ILeaderboard[]) => {
//   const sortedLeaderboard = leaderboard.sort((a: ILeaderboard, b: ILeaderboard) => {
//     if (a.totalPoints < b.totalPoints) return 1;
//     if (a.totalPoints > b.totalPoints) return -1;
//     if (a.totalVictories < b.totalVictories) return 1;
//     if (a.totalVictories > b.totalVictories) return -1;
//     if (a.goalsBalance < b.goalsBalance) return 1;
//     if (a.goalsBalance > b.goalsBalance) return -1;
//     if (a.goalsFavor < b.goalsFavor) return 1;
//     if (a.goalsFavor > b.goalsFavor) return -1;
//     if (a.goalsOwn < b.goalsOwn) return 1;
//     if (a.goalsOwn > b.goalsOwn) return -1;
//     return 0;
//   });
//   return sortedLeaderboard;
// };

// export { board, sortLeaderboard };
