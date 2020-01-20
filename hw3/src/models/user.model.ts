import * as sq from 'sequelize';
import sequelize from '../db-access';

const {Model} = sq;

export class User extends Model {
}

User.init({
    id: {
        type: sq.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: sq.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sq.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'user',
    timestamps: false,
});
