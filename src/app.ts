import express from 'express';
import routes from './routes/routes';
import sequelize from './utils/database';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/users', routes);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });



app.listen(PORT);
