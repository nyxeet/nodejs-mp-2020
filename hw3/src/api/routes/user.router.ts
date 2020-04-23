import {Router} from 'express';
import {createValidator} from 'express-joi-validation';
import UserController from '../controllers/user.controller';
import {usersBodySchema} from "../../validations/user.validation";
import middlewares from "../../middlewares/common.middleware";

const userRouter = Router();
const validator = createValidator();

const {checkAuth} = middlewares;

userRouter
    .get('/autoSuggest', checkAuth, UserController.getAutoSuggest)
    .get('/:id', checkAuth, UserController.getUserById)
    .get('/', checkAuth, UserController.getAllUsers)
    .post('/', validator.body(usersBodySchema), UserController.signUp)
    .post('/login', UserController.login)
    .put('/', checkAuth, validator.body(usersBodySchema), UserController.updateUser)
    .delete('/:id', checkAuth, UserController.deleteUser);

export default userRouter;
