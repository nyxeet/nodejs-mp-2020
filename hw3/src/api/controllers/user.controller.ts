import {Request, Response} from "express";
import UserService from "../../services/user.service";
import bunyanLoggers from "../../loggers/bunyan.logger";
import {UserInterface} from "../../interfaces/User.interface";

const getAutoSuggest = async (req: Request, res: Response) => {
    const {loginSubstring, limit = 5} = req.query;
    try {
        const limitedSuggestions = await UserService.getAutoSuggestedUsers(loginSubstring, limit);
        res.json(limitedSuggestions)
    } catch (e) {
        bunyanLoggers.serviceErrorsLogger
            .error(`Method: UserService.getAutoSuggestedUsers; Arguments: loginSubstring=${loginSubstring}, limit=${limit}; Error message: ${e.message};`);
        res.json({status: 400, message: e.message});
    }
};

const getUserById = async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const user = await UserService.getUserById(parseInt(id, 10));
        res.send(user);
    } catch (e) {
        bunyanLoggers.serviceErrorsLogger
            .error(`Method: UserService.getUserById; Arguments: id=${id}; Error message: ${e.message};`);
        res.json({status: 400, message: e.message});
    }
};

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserService.getAllUsers();
        res.send(users);
    } catch (e) {
        bunyanLoggers.serviceErrorsLogger
            .error(`Method: UserService.getAllUsers; Arguments: nothing; Error message: ${e.message};`);
        res.json({status: 400, message: e.message});
    }
};

const signUp = async (req: Request, res: Response) => {
    const userDTO: UserInterface = req.body;
    try {
        const userRecord = await UserService.signUp(userDTO);
        res.send(userRecord);
    } catch (e) {
        bunyanLoggers.serviceErrorsLogger
            .error(`Method: UserService.signup; Arguments: userDTO=${userDTO}; Error message: ${e.message};`);
        res.json({status: 400, message: e.message});
    }
};

const login = async (req, res) => {
    const userDTO = req.body;
    try {
        const token = await UserService.login(userDTO);
        if (token) res.status(200).send(token);
        res.json({status: 400, message: 'Something went wrong'})
    } catch (e) {
        bunyanLoggers.serviceErrorsLogger
            .error(`Method: UserService.login; Arguments: userDTO=${userDTO}; Error message: ${e.message};`);
        res.json({status: 400, message: e.message})
    }
};

const updateUser = async (req: Request, res: Response) => {
    const userDTO: UserInterface = req.body;
    try {
        const result = await UserService.updateUser(userDTO);
        res.send(result);
    } catch (e) {
        bunyanLoggers.serviceErrorsLogger
            .error(`Method: UserService.updateUser; Arguments: userDTO=${userDTO}; Error message: ${e.message};`);
        res.json({status: 400, message: e.message});
    }
};

const deleteUser = async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
        await UserService.deleteUser(parseInt(id, 10));
        res.json({status: 200, message: 'All is right!'});
    } catch (e) {
        bunyanLoggers.serviceErrorsLogger
            .error(`Method: UserService.deleteUser; Arguments: id=${id}; Error message: ${e.message};`);
        res.json({status: 400, message: e.message});
    }
};

const userController = {
    getAutoSuggest,
    getUserById,
    getAllUsers,
    signUp,
    login,
    updateUser,
    deleteUser
};

export default userController;
