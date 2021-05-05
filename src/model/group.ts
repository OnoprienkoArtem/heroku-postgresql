import { DataTypes } from 'sequelize';
import sequelize from '../utils/database';

const group = sequelize.define('Group',
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        permissions: {
            type: DataTypes.ARRAY(DataTypes.ENUM("READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES")),
            allowNull: false
        },
    }, {
        timestamps: true
    }
);

export default group;
