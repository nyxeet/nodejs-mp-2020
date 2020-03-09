import * as  express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import models from '../models';
import router from "../api/routes";
import morganLogger from "../middlewares/morganLogger.middleware";
import unhandledErrorsLogger from "../middlewares/unhandledErrorsLogger.middleware";

const app = express();
const {sequelize} = models;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morganLogger);

app.use(router);

sequelize.sync({
    force: false
}).then(() => console.log('Sequelize is synced!'));

app.use(unhandledErrorsLogger);

app.on('error', err => {
    console.log('Error in ***app*** level');
    console.log(err);
});

export default app;