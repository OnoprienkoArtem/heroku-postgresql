import { Options, Sequelize } from 'sequelize';
import development from '../../config/config';

const sequelize = new Sequelize(development as Options);

export default sequelize;
