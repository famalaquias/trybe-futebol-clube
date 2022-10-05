export interface ILeaderboardHome { // ITeamMatch
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface ILeaderboardHomeAway { // ITeamHome
  id: number,
  teamName: string,
  teamHome: ILeaderboardHome[],
}

export interface ILeaderboardAway { // ITeamAway
  id: number,
  teamName: string,
  teamAway: ILeaderboardHome[],
}

export interface ILeaderboard { // IBoard
  name:string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string,
}

export interface ILeader {
  id: number,
  teamName: string,
  teamAway: ILeaderboardHome[],
  teamHome: ILeaderboardHome[],
  name:string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string,
}
