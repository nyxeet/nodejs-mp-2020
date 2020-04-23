import {Router} from 'express';
import {createValidator} from 'express-joi-validation';
import GroupController from '../controllers/group.controller';
import {groupBodySchema} from '../../validations/group.validation';
import middlewares from "../../middlewares/common.middleware";

const groupRouter = Router();
const validator = createValidator();

const {checkAuth} = middlewares;

groupRouter
    .get('/:id', checkAuth, GroupController.getGroupById)
    .get('/', checkAuth, GroupController.getAllGroups)
    .post('/', checkAuth, validator.body(groupBodySchema), GroupController.createGroup)
    .put('/', checkAuth, validator.body(groupBodySchema), GroupController.updateGroup)
    .delete('/id', checkAuth, GroupController.deleteGroup);

export default groupRouter;
