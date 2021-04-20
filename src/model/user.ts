import {Sequelize, DataTypes} from 'sequelize';
import sequelize from '../utils/database';

const user = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    age: DataTypes.INTEGER,
    isDeleted: DataTypes.BOOLEAN,
}, {
    timestamps: false,
});

export default user;

