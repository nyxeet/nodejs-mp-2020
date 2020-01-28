import * as dotenv from "dotenv";

dotenv.config();

export default {
    port: parseInt(process.env.PORT, 10),
    pgUser: process.env.PG_USER,
    pgHost: process.env.PG_HOST,
    pgDatabase: process.env.PG_DATABASE,
    pgPassword: process.env.PG_PASSWORD,
    pgPort: parseInt(process.env.PG_PORT, 10)
}
