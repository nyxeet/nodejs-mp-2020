import {Pool} from 'pg';

export default async () => {
    const {
        DB_USER,
        DB_HOST,
        DB_DATABASE,
        DB_PASSWORD,
        DB_PORT
    } = process.env;

    return new Pool({
        user: DB_USER,
        host: DB_HOST,
        database: DB_DATABASE,
        password: DB_PASSWORD,
        port: DB_PORT,
        ssl: true,
    });
};
