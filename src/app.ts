import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import cors from 'cors';
import authenticate from './middleware/authenticate';

import routes from './routes/user-routes';
import groupRouter from './routes/group-routes';
import groupUsersRouter from './routes/group-users-routes';
import authRouter from './routes/auth-routes';

import { isOperationalError, logError, returnError } from './utils/handleError/helpers';
import sequelize from './utils/database';
import HttpError from './utils/handleError/httpError';
import httpLogger from './utils/handleError/httpLogger';
import logger from './utils/handleError/logger';
import jwtPassport from './middleware/passport';


const app = express();
const PORT = process.env.PORT || 3000;

jwtPassport(passport);

app.use(httpLogger);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/users', authenticate, routes);
app.use('/groups', authenticate, groupRouter);
app.use('/group-users', authenticate, groupUsersRouter);
app.use('/login', authRouter);

app.use(logError);
app.use(returnError);

process
    .on('unhandledRejection', (error: HttpError) => {
        logError(error);
    })
    .on('uncaughtException', (error: HttpError) => {
        logError(error);

        if (!isOperationalError(error)) {
            process.exit(1);
        }
    });

sequelize.authenticate()
    .then(() => logger.info('Connection has been established successfully.'))
    .catch(err => logError(err));

app.listen(PORT);
