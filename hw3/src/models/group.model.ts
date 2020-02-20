import SequelizeInit from '../models/init';

const {sequelize, Sequelize} = SequelizeInit;

export default class GroupModel extends Sequelize.Model {
    static associate(models) {
        this.belongsToMany(models.UserModel, {
            through: 'userGroup',
            as: 'users',
            foreignKey: 'groupId',
            onDelete: 'cascade'
        });
    }
}

GroupModel.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    permissions: {
        type: Sequelize.ARRAY(Sequelize.STRING)
    }
}, {
    sequelize,
    modelName: 'group',
    timestamps: false
});
