import {Sequelize, DataTypes} from 'sequelize';
import v4 from 'uuidv4';

export default (sequelize: Sequelize) => sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,
    },
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    age: DataTypes.INTEGER,
    isDeleted: DataTypes.BOOLEAN,
}, {
    timestamps: false,
});



