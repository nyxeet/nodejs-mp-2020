import * as sq from "sequelize";
import config from '../config';

const {Sequelize} = sq;

const sequelize = new Sequelize(config.pgDatabase, config.pgUser, config.pgPassword, {
    dialect: "postgres",
    host: config.pgHost,
    port: config.pgPort,
    dialectOptions: {
        ssl: true
    }
});

const init = {
    sequelize,
    Sequelize: sq
};

export default init;
