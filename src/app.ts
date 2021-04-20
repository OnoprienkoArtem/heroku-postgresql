import express from 'express';
import routes from './routes/routes';
import sequelize from './utils/database';
import user from "./model/user";

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/users', routes);

sequelize
    .authenticate()
    .then(() => {
        user(sequelize)
        console.log(sequelize.models);

        // sequelize.models.User.create({
        //     login: 'jack',
        //     password: 'jack1',
        //     age: 25,
        //     isDeleted: false
        // });

        console.log(sequelize.models.User.findAll());
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

sequelize.sync({force: false});

app.listen(PORT);
