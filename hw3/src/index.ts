import * as  express from 'express';
import * as bodyParser from 'body-parser';
import sequelize from './db-access';
import router from "./api/routes";
import config from './config';
import * as postgresql from './scripts/postgresql';
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);

postgresql.createAndFillUsersTable();

sequelize.sync({
    force: false
}).then(() => console.log('Sequelize is synced!'));

app.listen(config.port, () => console.log(`The app is running on ${config.port} port.`));
