import * as usersArray from '../data/Users.json';
import {User} from "../interfaces/User";
import {getAutoSuggestUsers} from "../helpers";

export const getAllUsers = (req, res) => {
    res.json(usersArray);
};

export const getUserById = (req, res) => {
    const {id} = req.params;
    const user = usersArray.find(item => item.id === id);
    if (!user) res.status(404).send('No user found!');
    res.send(user);
};

export const autoSuggest = (req, res) => {
  const { loginSubstring, limit = 5 } = req.query;
  const limitedSuggestions = getAutoSuggestUsers(usersArray, loginSubstring, limit);
  res.json(limitedSuggestions)
};

export const createUser = (req, res) => {
    const {login, password, age, isDeleted = false}: User = req.body;
    const user: User = {
        id: String(Math.floor(Math.random() * 100000000000)),
        login,
        password,
        age,
        isDeleted
    };
    usersArray.push(user);
    res.send(user);
};

export const updateUser = (req, res) => {
    const {login, password, isDeleted, age, id}: User = req.body;
    const user = {
        login,
        password,
        isDeleted,
        age,
        id,
    };
    usersArray.forEach((item, index) => {
        if (item.id === id) {
            usersArray[index] = user
        }
    });
    res.send(user);
};

export const deleteUser = (req, res) => {
    const {id} = req.params;
    usersArray.forEach((item, index) => {
        if (item.id === id) {
            usersArray[index] = {
                ...usersArray[index],
                isDeleted: true
            }
        }
    });
    res.send('Deleted!')
};

export default {
    getAllUsers
}
