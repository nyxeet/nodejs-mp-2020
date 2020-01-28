import * as sq from 'sequelize';
import sequelize from '../db-access';

const {Model} = sq;

export default class UserModel extends Model {
}

UserModel.init({
    id: {
        type: sq.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    login: {
        type: sq.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sq.STRING,
        allowNull: false
    },
    age: {
        type: sq.INTEGER,
        allowNull: false
    },
    isDeleted: {
        type: sq.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize,
    modelName: 'user',
    timestamps: false,
});
