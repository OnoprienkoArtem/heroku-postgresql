import {Sequelize, DataTypes} from 'sequelize';
import sequelize from '../utils/database';

const User = sequelize.define('user', {
    id: DataTypes.STRING,
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    age: DataTypes.INTEGER,
    isDeleted: DataTypes.BOOLEAN,
});

export default User;
