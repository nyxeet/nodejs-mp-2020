import SequelizeInit from './init';
import UserModel from "./user.model";
import GroupModel from "./group.model";
import UserGroupModel from "./userGroup.model";


const allModels = {
  UserModel,
  GroupModel,
  UserGroupModel
};

Object.values(allModels)
    .filter(model =>  typeof model.associate === 'function')
    .forEach(model => model.associate(allModels));


const models = {
    ...allModels,
    ...SequelizeInit
};

export default models;
