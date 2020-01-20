import * as  express from 'express';
import { User as UserModel } from './models/user.model'
import sequelize from './db-access';
import * as dotenv from "dotenv";
import * as bodyParser from 'body-parser';
import router from "./routers";

const app = express();

dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);

sequelize.sync();

app.listen(process.env.PORT, () => console.log(`The app is running on ${process.env.PORT} port.`));
