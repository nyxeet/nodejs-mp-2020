import models from './init';

const {sequelize, Sequelize} = models;

export default class UserModel extends Sequelize.Model {
    static associate(models) {
        this.belongsToMany(models.GroupModel, {
            through: 'userGroup',
            as: 'groups',
            foreignKey: 'userId',
            onDelete: 'cascade'
        });
    }
}

UserModel.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize,
    modelName: 'user',
    timestamps: false,
});
