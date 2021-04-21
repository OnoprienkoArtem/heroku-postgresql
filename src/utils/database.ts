import { Sequelize } from 'sequelize';

const DB_NAME = '';
const USER_NAME = '';
const PASSWORD = '';

const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
    host: '',
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

export default sequelize;
