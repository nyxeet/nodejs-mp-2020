import UserModel from '../models/user.model';
import {UserInterface} from "../interfaces/User.interface";
import {getAutoSuggestedUsers as getAutoSuggestedUsersHelper} from "../helpers";
import GroupModel from "../models/group.model";

export default class UserService {
    static async getUserById(id: number): Promise<UserInterface> {
        const user = await UserModel.findAll({
            raw: true,
            where: { id }
        });
        if (!user) throw new Error('Can\'t find user by Id');
        return user;
    }

    static async getAllUsers(): Promise<UserInterface[]> {
        const users = await UserModel.findAll({
            include: [
                {
                    model: GroupModel,
                    as: 'groups'
                }
            ]
        });
        if (!users) throw new Error('Some problems with getting all users');
        return users;
    }

    static async signup(user: UserInterface): Promise<UserInterface>{
        const userRecord = await UserModel.create(user);
        if (!userRecord) throw new Error('User can\'t be created');
        return userRecord;
    }

    static async getAutoSuggestedUsers(loginSubstring: string, limit: number): Promise<UserInterface[]> {
        const users = await UserModel.findAll({raw: true});
        if (!users) throw new Error('Some problems with getting all users');
        return getAutoSuggestedUsersHelper(users, loginSubstring, limit)
    }

    static async updateUser(userDTO: UserInterface): Promise<Array<number>> {
        const result = await UserModel.update(userDTO, {
            where: {
                id: userDTO.id
            }
        });
        if (!result) throw new Error('Can\'t be updated');
        return result;
    }

    static async deleteUser(id: number): Promise<number> {
        const result = await UserModel.destroy({
            where: {id}
        });
        if (!result) throw new Error('Can\'t be deleted');
        return result;
    }
}
