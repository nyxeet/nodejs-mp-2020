import createPool from '../loaders/postgres';
import * as sq from 'sequelize';

const {Sequelize, Model} = sq;

const sequelize = new Sequelize("da8194v0p2oku5", "zhtgstunrlsjrp", "60ab0b3e25e4850246fc35961b0151666949c36f63c3707d97270c489d32575f", {
    dialect: "postgres",
    host: "ec2-54-75-224-168.eu-west-1.compute.amazonaws.com",
    port: 5432,
    dialectOptions: {
        ssl: true
    }
});

export class User extends Model {}
User.init({
    id: {
        type: sq.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: sq.STRING,
        allowNull: false
    },
    password: {
        type: sq.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'user'
});

sequelize.sync().then(result => console.log(result));

export const createUser = async (user) => {
    const pool = await createPool();
    try {
        await pool.query('INSERT INTO users VALUES($1, $2, $3)', [user.name, user.surname, user.password])
    } catch (e) {
        throw Error(e)
    }
};

export const getUsers = async () => {
    const pool = await createPool();
    const data = await pool.query('SELECT * from users');

    return data.rows;
};
