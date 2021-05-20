import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import sequelize from './utils/database';

import routes from './routes/user-routes';
import groupRouter from './routes/group-routes';
import groupUsersRouter from './routes/group-users-routes';
import {isOperationalError, logError, returnError} from "./utils/hendleError/helpers";
import BaseError from "./utils/hendleError/baseError";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/users', routes);
app.use('/groups', groupRouter);
app.use('/group-users', groupUsersRouter);


app.use(returnError);

process.on('uncaughtException', (error: BaseError) => {
    logError(error);

    if (!isOperationalError(error)) {
        process.exit(1);
    }
})

sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

app.listen(PORT);
