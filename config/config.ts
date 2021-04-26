import {Options} from "sequelize/types";

const config: {development: Options} = {
    development: {
        username: 'ouaicwafadjnvv',
        password: 'f066d15defe2629afdc4f8a614e67cb6e4c468ede2b7f0df4adca76d9469d9fb',
        database: 'da1b2a71vi6jrs',
        host: 'ec2-54-228-99-58.eu-west-1.compute.amazonaws.com',
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
};

export default config.development;
