import Controllers from './user.controller';
import UserService from "../../services/user.service";
import * as sinon from "sinon";
import {mockResponse} from "../../helpers/test.helper";

describe('user.controller', () => {
    const errorMessage = 'Something went wrong';

    describe('getAutoSuggest', () => {
        afterEach(() => {
            sinon.restore();
        });

        it('should send limitedSuggestions of users', async () => {
            const limitedSuggestions = [{
                id: '1',
                login: 'login',
                password: 'hashedPassword',
                age: 20,
                isDeleted: false
            }];
            const req = {
                query: {
                    loginSubstring: 'log',
                    limit: '10'
                }
            };
            const res = mockResponse();

            sinon.replace(UserService, 'getAutoSuggestedUsers', sinon.fake.returns(limitedSuggestions));
            await Controllers.getAutoSuggest(req, res);

            expect(res.json).toHaveBeenCalledWith(limitedSuggestions);
        });

        it('should send 400 with an error message', async () => {
            const req = {query: {}};
            const res = mockResponse();
            const stub = sinon.stub(UserService, 'getAutoSuggestedUsers');

            stub.throws('error', errorMessage);
            await Controllers.getAutoSuggest(req, res);

            expect(res.json).toHaveBeenCalledWith({
                status: 400,
                message: errorMessage
            });
        });
    });

    describe('getUserById', () => {
        afterEach(() => {
            sinon.restore()
        });

        it('should send user data', async () => {
            const id = '1';
            const req = {params: {id}};
            const res = mockResponse();
            const user = {
                id,
                login: 'login',
                password: 'pass',
                age: '20'
            };

            sinon.replace(UserService, 'getUserById', sinon.fake.returns(user));
            await Controllers.getUserById(req, res);

            expect(res.send).toBeCalledWith(user);
        });

        it('should send 400 with an error message', async () => {
            const req = {params: {}};
            const res = mockResponse();
            const stub = sinon.stub(UserService, 'getUserById');

            stub.throws('Error', errorMessage);
            await Controllers.getUserById(req, res);

            expect(res.json).toBeCalledWith({status: 400, message: errorMessage})
        });
    });

    describe('getAllUsers', () => {
        afterEach(() => {
            sinon.restore()
        });

        it('should send users data', async () => {
            const req = {};
            const res = mockResponse();
            const user = {
                id: 1,
                login: 'login',
                password: 'pass',
                age: '20'
            };
            const users = [user];

            sinon.replace(UserService, 'getAllUsers', sinon.fake.returns(users));
            await Controllers.getAllUsers(req, res);

            expect(res.send).toBeCalledWith(users);
        });

        it('should send 400 with an error message', async () => {
            const req = {params: {}};
            const res = mockResponse();
            const stub = sinon.stub(UserService, 'getAllUsers');

            stub.throws('Error', errorMessage);
            await Controllers.getAllUsers(req, res);

            expect(res.json).toBeCalledWith({status: 400, message: errorMessage})
        });
    });

    describe('signUp', () => {
        afterEach(() => {
            sinon.restore()
        });

        it('should send user record', async () => {
            const req = {};
            const res = mockResponse();
            const user = {
                id: 1,
                login: 'login',
                password: 'pass',
                age: '20',
                isDeleted: false
            };

            sinon.replace(UserService, 'signUp', sinon.fake.returns(user));
            await Controllers.signUp(req, res);

            expect(res.send).toBeCalledWith(user);
        });

        it('should send 400 with an error message', async () => {
            const req = {params: {}};
            const res = mockResponse();
            const stub = sinon.stub(UserService, 'signUp');

            stub.throws('Error', errorMessage);
            await Controllers.signUp(req, res);

            expect(res.json).toBeCalledWith({status: 400, message: errorMessage})
        });
    });

    describe('login', () => {
        afterEach(() => {
            sinon.restore()
        });

        it('should send 200 with token', async () => {
            const req = { body: {} };
            const res = mockResponse();
            const token = 'token';

            sinon.replace(UserService, 'login', sinon.fake.returns(token));
            await Controllers.login(req, res);

            expect(res.status).toBeCalledWith(200);
            expect(res.send).toBeCalledWith(token);
        });

        it('should send 400 with an error message when token is undefined', async () => {
            const req = {body: {}};
            const res = mockResponse();

            sinon.replace(UserService, 'login', sinon.fake.returns(undefined));
            await Controllers.login(req, res);

            expect(res.json).toBeCalledWith({status: 400, message: errorMessage})
        });

        it('should send 400 with an error message', async () => {
            const req = {body: {}};
            const res = mockResponse();
            const stub = sinon.stub(UserService, 'login');

            stub.throws('Error', errorMessage);
            await Controllers.login(req, res);

            expect(res.json).toBeCalledWith({status: 400, message: errorMessage})
        });
    });

    describe('updateUser', () => {
        afterEach(() => {
            sinon.restore()
        });

        it('should send updated user', async () => {
            const req = {};
            const res = mockResponse();
            const user = {
                id: 1,
                login: 'login',
                password: 'pass',
                age: '20',
                isDeleted: false
            };

            sinon.replace(UserService, 'updateUser', sinon.fake.returns(user));
            await Controllers.updateUser(req, res);

            expect(res.send).toBeCalledWith(user);
        });

        it('should send 400 with an error message', async () => {
            const req = {params: {}};
            const res = mockResponse();
            const stub = sinon.stub(UserService, 'updateUser');

            stub.throws('Error', errorMessage);
            await Controllers.updateUser(req, res);

            expect(res.json).toBeCalledWith({status: 400, message: errorMessage})
        });
    });

    describe('deleteUser', () => {
        afterEach(() => {
            sinon.restore()
        });

        it('should send 200 and message that all is right', async () => {
            const req = { params: {}};
            const res = mockResponse();

            sinon.replace(UserService, 'deleteUser', sinon.fake());
            await Controllers.deleteUser(req, res);

            expect(res.json).toBeCalledWith({status: 200, message: 'All is right!'});
        });

        it('should send 400 with an error message', async () => {
            const req = {params: {}};
            const res = mockResponse();
            const stub = sinon.stub(UserService, 'deleteUser');

            stub.throws('Error', errorMessage);
            await Controllers.deleteUser(req, res);

            expect(res.json).toBeCalledWith({status: 400, message: errorMessage})
        });
    });
});


