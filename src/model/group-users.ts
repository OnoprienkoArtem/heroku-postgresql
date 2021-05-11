import sequelize from '../utils/database';
import { DataTypes } from 'sequelize';

import User from '../model/user';
import Group from '../model/group';


const groupUsers = sequelize.define('GroupUsers',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Group,
                key: 'id'
            }
        },
        groupId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        }
    }, {
        timestamps: true
    }
);

User.belongsToMany(Group, {
    through: {
        model: groupUsers,
        unique: false
    },
    foreignKey: 'userId',
    otherKey: 'groupId'
});


Group.belongsToMany(User, {
    through: {
        model: groupUsers,
        unique: false
    },
    foreignKey: 'groupId',
    otherKey: 'userId'
});

export default groupUsers;
