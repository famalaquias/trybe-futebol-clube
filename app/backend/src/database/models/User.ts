import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Users extends Model {
  // deve ser public - ter campo - e tipo
  public id!: number;
  public username!: string;
  public role!: string;
  public email!: string;
  public password!: string;
}

Users.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING(50),
    allowNull: false,
  },
  role: {
    type: STRING(50),
    allowNull: false,
  },
  email: {
    type: STRING(50),
    allowNull: false,
  },
  password: {
    type: STRING(100),
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default Users;
