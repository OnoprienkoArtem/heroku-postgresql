import { Options, Sequelize } from 'sequelize';
import config from '../../config/config.json';

const sequelize = new Sequelize(config.development as Options);

export default sequelize;
