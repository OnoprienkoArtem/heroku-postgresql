import {Sequelize} from 'sequelize';



const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
    host: '',
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    }
});

export default sequelize;



