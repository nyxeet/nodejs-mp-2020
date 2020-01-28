import * as  express from 'express';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import router from "./routers";

const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);

app.listen(process.env.PORT, () => console.log(`The app is running on ${process.env.PORT} port.`));

