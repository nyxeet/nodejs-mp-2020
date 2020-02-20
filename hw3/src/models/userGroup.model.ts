import SequelizeInit from './init';
import UserModel from "./user.model";
import GroupModel from "./group.model";

const {Sequelize, sequelize} = SequelizeInit;

export default class UserGroupModel extends Sequelize.Model {
    static associate(){}
}

UserGroupModel.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: UserModel,
                key: 'id'
            }
        },
        groupId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: GroupModel,
                key: 'id'
            }
        }
    },
    {
        sequelize,
        modelName: 'userGroup',
        timestamps: false,
    });
