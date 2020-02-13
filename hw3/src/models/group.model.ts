import * as sq from 'sequelize';
import sequelize from '../db-access';

const {Model} = sq;

export default class GroupModel extends Model {
}

GroupModel.init({
    id: {
        type: sq.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sq.STRING,
        allowNull: false
    },
    permissions: {
        type: sq.ARRAY(sq.STRING)
    }

}, {
    sequelize,
    modelName: 'group',
    timestamps: false
});
