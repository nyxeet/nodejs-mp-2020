import * as  express from 'express';
import * as bodyParser from 'body-parser';
import models from './models';
import router from "./api/routes";
import config from './config';
import morganLogger from "./middlewares/morganLogger.middleware";
import unhandledErrorsLogger from "./middlewares/unhandledErrorsLogger.middleware";

const app = express();
const {sequelize} = models;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morganLogger);

app.use(router);

sequelize.sync({
    force: false
}).then(() => console.log('Sequelize is synced!'));

app.listen(config.port, () => console.log(`The app is running on ${config.port} port.`));

app.use(unhandledErrorsLogger);

app.on('error', err => {
    console.log('Error in ***app*** level');
    console.log(err);
});

process.on('uncaughtException', err => {
    console.log('***uncaughtException***');
    console.log(err);
});

process.on('unhandledRejection', err => {
    console.log('***unhandledRejection***');
    console.log(err);
});
