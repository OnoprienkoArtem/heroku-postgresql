import express from 'express';
import routes from './routes/routes';
import sequelize from './utils/database';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use('/users', routes);

sequelize.authenticate()
    .then(() => {
        sequelize.sync();
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

app.listen(PORT);
