import * as  express from 'express';
import { getUsers, createUser } from './models/user.model'
import * as dotenv from "dotenv";
import * as bodyParser from 'body-parser';
import router from "./routers";

const app = express();

dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);

getUsers().then(data => {
    console.log(data);
});
//
// createUser({
//     name: 'Serhii',
//     surname: 'Khomych',
//     password: 'Password'
// }).then(result => {
//     console.log(result);
// }).catch(error => {
//     console.log('from root')
// });

app.listen(process.env.PORT, () => console.log(`The app is running on ${process.env.PORT} port.`));

