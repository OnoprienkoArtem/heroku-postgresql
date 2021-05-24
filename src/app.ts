import express from 'express';
import bodyParser from 'body-parser';

import sequelize from './utils/database';
import routes from './routes/user-routes';
import groupRouter from './routes/group-routes';
import groupUsersRouter from './routes/group-users-routes';
import { isOperationalError, logError, returnError } from './utils/handleError/helpers';
import HttpError from './utils/handleError/httpError';
import httpLogger from './utils/handleError/httpLogger';
import logger from './utils/handleError/logger';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(httpLogger);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/users', routes);
app.use('/groups', groupRouter);
app.use('/group-users', groupUsersRouter);

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
