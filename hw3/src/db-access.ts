import * as sq from 'sequelize';

const {Sequelize} = sq;

const sequelize = new Sequelize("da8194v0p2oku5", "zhtgstunrlsjrp", "60ab0b3e25e4850246fc35961b0151666949c36f63c3707d97270c489d32575f", {
    dialect: "postgres",
    host: "ec2-54-75-224-168.eu-west-1.compute.amazonaws.com",
    port: 5432,
    dialectOptions: {
        ssl: true
    }
});

export default sequelize;
