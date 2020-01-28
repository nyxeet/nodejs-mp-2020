import {Request, Response, Router} from 'express';
import { createValidator } from 'express-joi-validation';
import UserService from '../../services/user.service';
import {usersBodySchema} from "../../validations/users.validation";
import {UserInterface} from "../../interfaces/User.interface";

const userRouter = Router();
const validator = createValidator();

userRouter
    .get('/autoSuggest', async (req: Request, res: Response) => {
        const { loginSubstring, limit = 5 } = req.query;
        const limitedSuggestions = await UserService.getAutoSuggestedUsers(loginSubstring, limit);
        res.json(limitedSuggestions)
    })
    .get('/:id', async (req: Request, res: Response) => {
        const {id} = req.params;
        const user = await UserService.getUserById(parseInt(id, 10));
        res.send(user);
    })
    .get('/', async (req: Request, res: Response) => {
        const users = await UserService.getAllUsers();
        res.send(users);
    })
    .post('/', validator.body(usersBodySchema), async (req: Request, res: Response) => {
        const userDTO: UserInterface = req.body;
        const userRecord = await UserService.signup(userDTO);
        res.send(userRecord);
    })
    .put('/', validator.body(usersBodySchema), async (req: Request, res: Response) => {
        const userDTO = req.body;
        const result = await UserService.updateUser(userDTO);
        res.send(result);
    })
    .delete('/:id', async (req: Request, res: Response) => {
        const { id } = req.params;
        await UserService.deleteUser(parseInt(id, 10));
        res.status(200).send('All is right!');
    });

export default userRouter;
