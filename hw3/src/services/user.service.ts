import * as jwt from 'jsonwebtoken';
import * as argon2 from 'argon2';
import UserModel from '../models/user.model';
import {UserInterface} from "../interfaces/User.interface";
import {getAutoSuggestedUsers as getAutoSuggestedUsersHelper} from "../helpers";
import GroupModel from "../models/group.model";

export default class UserService {
    static async getUserById(id: number): Promise<UserInterface> {
        if (!id) throw new Error(`Id is ${id}`);
        const user = await UserModel.findAll({
            raw: true,
            where: {id}
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

    static async signUp(userDTO: UserInterface): Promise<UserInterface> {
        const hashedPassword = await argon2.hash(userDTO.password);
        const user = {
            ...userDTO,
            password: hashedPassword
        };
        const userRecord = await UserModel.create(user);
        if (!userRecord) throw new Error('User can\'t be created');
        return userRecord;
    }

    static async login({login, password}: { login: string, password: string }) {
        try {
            const user = await UserModel.findOne({where: {login}});
            const isPasswordCorrect = await argon2.verify(user?.password, password);
            if (isPasswordCorrect) return jwt.sign({login, id: user.id}, process.env.SECRET_JWT, {expiresIn: '1h'});
            throw new Error()
        } catch (e) {
            throw new Error(`User: ${login} is not found or password is wrong!`)
        }
    }

    static async getAutoSuggestedUsers(loginSubstring: string, limit: number): Promise<UserInterface[]> {
        if (!loginSubstring || !limit) throw new Error('Please, pass params to function');
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
