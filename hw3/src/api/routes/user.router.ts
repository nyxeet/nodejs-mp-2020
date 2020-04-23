import {Request, Response, Router} from 'express';
import {createValidator} from 'express-joi-validation';
import UserService from '../../services/user.service';
import {usersBodySchema} from "../../validations/user.validation";
import {UserInterface} from "../../interfaces/User.interface";
import bunyanLoggers from "../../loggers/bunyan.logger";
import middlewares from "../../middlewares/common.middleware";

const userRouter = Router();
const validator = createValidator();

const {checkAuth} = middlewares;

userRouter
    .get('/autoSuggest', checkAuth, async (req: Request, res: Response) => {
        const {loginSubstring, limit = 5} = req.query;
        try {
            const limitedSuggestions = await UserService.getAutoSuggestedUsers(loginSubstring, limit);
            res.json(limitedSuggestions)
        } catch (e) {
            bunyanLoggers.serviceErrorsLogger
                .error(`Method: UserService.getAutoSuggestedUsers; Arguments: loginSubstring=${loginSubstring}, limit=${limit}; Error message: ${e.message};`);
            res.json({status: 400, message: e.message});
        }
    })
    .get('/:id', checkAuth, async (req: Request, res: Response) => {
        const {id} = req.params;
        try {
            const user = await UserService.getUserById(parseInt(id, 10));
            res.send(user);
        } catch (e) {
            bunyanLoggers.serviceErrorsLogger
                .error(`Method: UserService.getUserById; Arguments: id=${id}; Error message: ${e.message};`);
            res.json({status: 400, message: e.message});
        }
    })
    .get('/', checkAuth , async (req: Request, res: Response) => {
        try {
            const users = await UserService.getAllUsers();
            res.send(users);
        } catch (e) {
            bunyanLoggers.serviceErrorsLogger
                .error(`Method: UserService.getAllUsers; Arguments: nothing; Error message: ${e.message};`);
            res.json({status: 400, message: e.message});
        }
    })
    .post('/', validator.body(usersBodySchema), async (req: Request, res: Response) => {
        const userDTO: UserInterface = req.body;
        try {
            const userRecord = await UserService.signup(userDTO);
            res.send(userRecord);
        } catch (e) {
            bunyanLoggers.serviceErrorsLogger
                .error(`Method: UserService.signup; Arguments: userDTO=${userDTO}; Error message: ${e.message};`);
            res.json({status: 400, message: e.message});
        }
    })
    .post('/login', async (req, res) => {
        const userDTO = req.body;
        try {
            const token = await UserService.login(userDTO);
            if (token) res.status(200).send(token);
            res.status(400)
        } catch (e) {
            bunyanLoggers.serviceErrorsLogger
                .error(`Method: UserService.login; Arguments: userDTO=${userDTO}; Error message: ${e.message};`);
            res.json({status: 400, message: e.message})
        }

    })
    .put('/', checkAuth, validator.body(usersBodySchema), async (req: Request, res: Response) => {
        const userDTO: UserInterface = req.body;
        try {
            const result = await UserService.updateUser(userDTO);
            res.send(result);
        } catch (e) {
            bunyanLoggers.serviceErrorsLogger
                .error(`Method: UserService.updateUser; Arguments: userDTO=${userDTO}; Error message: ${e.message};`);
            res.json({status: 400, message: e.message});
        }
    })
    .delete('/:id', checkAuth, async (req: Request, res: Response) => {
        const {id} = req.params;
        try {
            await UserService.deleteUser(parseInt(id, 10));
            res.status(200).send('All is right!');
        } catch (e) {
            bunyanLoggers.serviceErrorsLogger
                .error(`Method: UserService.deleteUser; Arguments: id=${id}; Error message: ${e.message};`);
            res.json({status: 400, message: e.message});
        }
    });

export default userRouter;
