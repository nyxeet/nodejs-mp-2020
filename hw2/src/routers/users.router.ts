import { Router } from 'express';
import { createValidator } from 'express-joi-validation';
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    autoSuggest
} from "../controllers/users.controller";
import {usersBodySchema} from "../validations/users.validation";

const userRouter = Router();
const validator = createValidator();

userRouter
    .get('/autoSuggest', autoSuggest)
    .get('/:id', getUserById)
    .get('/', getAllUsers)
    .post('/', validator.body(usersBodySchema), createUser)
    .put('/', validator.body(usersBodySchema), updateUser)
    .delete('/:id', deleteUser);

export default userRouter;
