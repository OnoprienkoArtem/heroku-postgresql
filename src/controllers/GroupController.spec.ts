import { NextFunction, Request, Response, Send } from 'express';
import GroupService from '../services/Group.service';
import GroupController from './GroupController';


describe('GroupController', (): void => {
    let req: Request;
    let res: Response;
    let next: NextFunction;

    const groupMock = {
        id: '1',
        name: 'groupName',
        permissions: ['READ', 'WRITE']
    };

    const bodyMock = {
        name: 'groupName',
        permissions: ['READ', 'WRITE']
    };

    const paramIdMock = {
        id: 1
    } as any;

    class GroupServiceMock {
        getGroupById = jest.fn();
        getAllGroups = jest.fn();
        createNewGroup = jest.fn();
        updateGroupById = jest.fn();
        removeGroupById = jest.fn();
    }

    const service = new GroupServiceMock() as unknown as GroupService;
    const controller = new GroupController(service);

    beforeEach(() => {
        req = {
            params: {},
            query: {},
            body: {}
        } as Request;

        res = {
            json: jest.fn() as Send,
            send: jest.fn() as Send,
            status: jest.fn().mockImplementation(() => res) as Send
        } as Response;

        next = jest.fn() as NextFunction;

        req.params = paramIdMock;
        req.body = bodyMock;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getGroupById', (): void => {
        it('should call getGroupById method with proper params and send correct data', async () => {
            service.getGroupById = jest.fn().mockResolvedValue(groupMock);
            await controller.getGroupById(req, res, next);

            expect(service.getGroupById).toBeCalledWith(paramIdMock.id);
            expect(res.send).toBeCalledWith(groupMock);
        });

        it('should throw 404 error if user not found', async () => {
            service.getGroupById = jest.fn().mockResolvedValue(null);
            await controller.getGroupById(req, res, next);

            expect(next).toBeCalledWith(new Error('Not found.'));
        });
    });

    describe('getAllGroups', (): void => {
        it('should call getAllGroups and send correct data', async () => {
            service.getAllGroups = jest.fn().mockResolvedValue([groupMock]);
            await controller.getAllGroups(req, res, next);

            expect(service.getAllGroups).toBeCalled();
            expect(res.send).toBeCalledWith([groupMock]);
        });

        it('should throw 404 error if users not found', async () => {
            service.getAllGroups = jest.fn().mockResolvedValue([]);
            await controller.getAllGroups(req, res, next);

            expect(next).toBeCalledWith(new Error('Not found.'));
        });
    });

    describe('createNewGroup', (): void => {
        it('should call createNewGroup method with proper params and send correct data', async () => {
            service.createNewGroup = jest.fn().mockResolvedValue(groupMock);
            await controller.createNewGroup(req, res);

            expect(service.createNewGroup).toBeCalledWith(bodyMock.name, bodyMock.permissions);
            expect(res.status).toBeCalledWith(201);
            expect(res.send).toBeCalledWith(groupMock);
        });
    });

    describe('updateGroupById', (): void => {
        it('should call updateGroupById method with proper params and send correct data', async () => {
            service.getGroupById = jest.fn().mockResolvedValue(1);
            service.updateGroupById = jest.fn().mockResolvedValue(1);
            await controller.updateGroupById(req, res, next);

            expect(service.updateGroupById).toBeCalledWith(paramIdMock.id, bodyMock.name, bodyMock.permissions);
            expect(res.send).toBeCalledWith(1);
        });

        it('should throw 404 error if user not found', async () => {
            service.getGroupById = jest.fn().mockResolvedValue(null);
            await controller.updateGroupById(req, res, next);

            expect(next).toBeCalledWith(new Error('Not found.'));
        });
    });

    describe('removeGroupById', (): void => {
        it('should call removeGroupById method with proper params and send message', async () => {
            service.getGroupById = jest.fn().mockResolvedValue(1);
            await controller.removeGroupById(req, res, next);

            expect(service.removeGroupById).toBeCalledWith(paramIdMock.id);
            expect(res.send).toBeCalledWith({ message: 'Group has been deleted.' });
        });

        it('should throw 404 error if user not found', async () => {
            service.getGroupById = jest.fn().mockResolvedValue(null);
            await controller.removeGroupById(req, res, next);

            expect(next).toBeCalledWith(new Error('Not found.'));
        });
    });
});
