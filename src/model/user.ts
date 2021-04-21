import { DataTypes } from 'sequelize';
import sequelize from '../utils/database';

const user = sequelize.define('User',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        timestamps: true
    }
);

export default user;

