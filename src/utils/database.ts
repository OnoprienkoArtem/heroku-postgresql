import { Sequelize } from 'sequelize';
import config from '../../config/config';

const sequelize = new Sequelize({ ...config, dialect: config.dialect });

export default sequelize;
