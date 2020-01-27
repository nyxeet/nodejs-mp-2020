import { Pool } from 'pg';
import {UserInterface} from "../interfaces/User.interface";
import {Promise as SqPromise}from "sequelize";
import config from '../config';

const createUsersTable = ` 
CREATE TABLE IF NOT EXISTS "users" (
    "id"   SERIAL ,
    "login" VARCHAR(255) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL,
    "age" INTEGER NOT NULL,
    "isDeleted" BOOLEAN DEFAULT false,
    PRIMARY KEY ("id")
)`;

const createUser = `
INSERT INTO "users" 
    ("id","login","password","age","isDeleted") 
    VALUES (DEFAULT,$1,$2,$3,$4) RETURNING *;
`;



const pool = new Pool({
    user: config.pgUser,
    host: config.pgHost,
    database: config.pgDatabase,
    password: config.pgPassword,
    port: config.pgPort,
    ssl: true
    ,
});

const users = [
    {
        login: 'Serhii',
        password: 'password',
        age: 13
    },
    {
        login: 'Artem',
        password: 'password',
        age: 23
    },
    {
        login: 'Maks',
        password: 'password',
        age: 45
    },
    {
        login: 'Alex',
        password: 'password',
        age: 10
    },
    {
        login: 'Pavlo',
        password: 'password',
        age: 77
    }
];

export async function createAndFillUsersTable() {
    await pool.query(createUsersTable);
    users.reduce((acc: UserInterface[], user:UserInterface): SqPromise<UserInterface[]> => {
        const result = pool.query(createUser, [user.login, user.password, user.age, false]);
        return [...acc, result];
    }, []);
}

