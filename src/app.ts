import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import sequelize from './utils/database';

import routes from './routes/user-routes';
import groupRouter from './routes/group-routes';
import groupUsersRouter from './routes/group-users-routes';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/users', routes);
app.use('/groups', groupRouter);
app.use('/group-users', groupUsersRouter);

sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

app.listen(PORT);
