import {Dialect, Sequelize} from 'sequelize';
import config from '../../config/config';

const sequelize = new Sequelize({...config, dialect: config.dialect as Dialect} );

export default sequelize;
