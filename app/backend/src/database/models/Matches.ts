import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Teams from './Team';

class Matches extends Model {
  public id!: number;
  public homeTeam!: number;
  public homeTeamGoals!: number;
  public awayTeam!: number;
  public awayTeamGoals!: number;
  public inProgress!: boolean;
}

Matches.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
  },
  homeTeamGoals: {
    type: INTEGER,
  },
  awayTeam: {
    type: INTEGER,
  },
  awayTeamGoals: {
    type: INTEGER,
  },
  inProgress: {
    type: BOOLEAN,
  },
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

// Dica do course de como usar Associations:
// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });
// belongsTo: pertencente a (1:1)

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });
// hasMany: tem muitos (1:N)

Teams.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });
Teams.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });

Matches.hasMany(Matches, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.hasMany(Matches, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Matches;
