import Controller from './group.controller';
import GroupService from '../../services/group.service';
import * as sinon from 'sinon';
import {mockResponse} from "../../helpers/test.helper";

describe.only('group.controller', () => {
    const errorMessage = 'Something went wrong';

    describe('getGroupById', () => {
        afterEach(() => {
            sinon.restore();
        });

        it('should send group data', async () => {
            const req = {params: {}};
            const res = mockResponse();
            const group = {
                id: '1',
                name: 'admin',
                permissions: ['READ']
            };

            sinon.replace(GroupService, 'getGroupById', sinon.fake.returns(group));
            await Controller.getGroupById(req, res);

            expect(res.send).toHaveBeenCalledWith(group);
        });

        it('should send 400 with error message', async () => {
            const req = {params: {}};
            const res = mockResponse();
            const stub = sinon.stub(GroupService, 'getGroupById');

            stub.throws('Error', errorMessage);
            await Controller.getGroupById(req, res);

            expect(res.json).toBeCalledWith({status: 400, message: errorMessage});
        });
    });

    describe('getAllGroups', () => {
        afterEach(() => {
            sinon.restore();
        });

        it('should send all groups', async () => {
            const req = {};
            const res = mockResponse();
            const group = {
                id: '1',
                name: 'admin',
                permissions: ['READ']
            };
            const groups = [group];

            sinon.replace(GroupService, 'getAllGroups', sinon.fake.returns(groups));
            await Controller.getAllGroups(req, res);

            expect(res.send).toHaveBeenCalledWith(groups);
        });

        it('should send 400 with error message', async () => {
            const req = {};
            const res = mockResponse();
            const stub = sinon.stub(GroupService, 'getAllGroups');

            stub.throws('Error', errorMessage);
            await Controller.getAllGroups(req, res);

            expect(res.json).toBeCalledWith({status: 400, message: errorMessage});
        });
    });

    describe('createGroup', () => {
        afterEach(() => {
            sinon.restore();
        });

        it('should send group record', async () => {
            const req = {body: {}};
            const res = mockResponse();
            const groupRecord = {
                id: '1',
                name: 'admin',
                permissions: ['READ']
            };

            sinon.replace(GroupService, 'createGroup', sinon.fake.returns(groupRecord));
            await Controller.createGroup(req, res);

            expect(res.send).toHaveBeenCalledWith(groupRecord);
        });

        it('should send 400 with error message', async () => {
            const req = {};
            const res = mockResponse();
            const stub = sinon.stub(GroupService, 'createGroup');

            stub.throws('Error', errorMessage);
            await Controller.createGroup(req, res);

            expect(res.json).toBeCalledWith({status: 400, message: errorMessage});
        });
    });

    describe('deleteGroup', () => {
        afterEach(() => {
            sinon.restore();
        });

        it('should send group record', async () => {
            const req = {params: {}};
            const res = mockResponse();

            sinon.replace(GroupService, 'removeGroupById', sinon.fake());
            await Controller.deleteGroup(req, res);

            expect(res.send).toHaveBeenCalledWith('All is good!');
        });

        it('should send 400 with error message', async () => {
            const req = {params: {}};
            const res = mockResponse();
            const stub = sinon.stub(GroupService, 'removeGroupById');

            stub.throws('Error', errorMessage);
            await Controller.deleteGroup(req, res);

            expect(res.json).toBeCalledWith({status: 400, message: errorMessage});
        });
    });
});
