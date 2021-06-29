import { NextFunction, Request, Response, Send } from 'express';
import UserService from '../services/User.service';
import UserController from './UserController';


describe('UserController', (): void => {
    let req: Request;
    let res: Response;
    let next: NextFunction;

    const userMock = {
        id: 1,
        login: 'ee',
        password: 'eee',
        age: 22,
        isDeleted: true
    };

    const queryMock = {
        login: 'testLogin',
        limit: '2'
    };

    const idMock = {
        id: 1
    } as any;

    class UserServiceMock {
        getUsers = jest.fn();
        getUserById = jest.fn();
        createUser = jest.fn();
        updateUserById = jest.fn();
        removeUserById = jest.fn();
    }

    const service = new UserServiceMock() as unknown as UserService;
    const controller = new UserController(service);

    beforeEach(() => {
        req = {
            params: {},
            query: {}
        } as Request;

        res = {
            json: jest.fn() as Send,
            send: jest.fn() as Send,
            status: jest.fn().mockImplementation(() => res) as Send
        } as Response;

        next = jest.fn() as NextFunction;

        req.query = queryMock;
        req.params = idMock;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAutoSuggestUsers', (): void => {
        it('should call getUsers method with proper params and send correct data', async () => {
            service.getUsers = jest.fn().mockResolvedValue([userMock]);
            await controller.getAutoSuggestUsers(req, res, next);

            expect(service.getUsers).toBeCalledWith(queryMock.login, queryMock.limit);
            expect(res.send).toBeCalledWith([userMock]);
        });

        it('should throw 404 error if users not found', async () => {
            service.getUsers = jest.fn().mockResolvedValue([]);
            await controller.getAutoSuggestUsers(req, res, next);

            expect(next).toBeCalledWith(new Error('Not found.'));
        });
    });

    describe('getUserById', (): void => {
        it('should call getUserById method with proper params and send correct data', async () => {
            service.getUserById = jest.fn().mockResolvedValue(userMock);
            await controller.getUserById(req, res, next);

            expect(service.getUserById).toBeCalledWith(idMock.id);
            expect(res.json).toBeCalledWith(userMock);
        });

        it('should throw 404 error if user not found', async () => {
            service.getUserById = jest.fn().mockResolvedValue(null);
            await controller.getUserById(req, res, next);

            expect(next).toBeCalledWith(new Error('Not found.'));
        });
    });

    describe('createUser', (): void => {
        it('should call createUser method with proper params', async () => {
            service.createUser = jest.fn().mockResolvedValue(userMock);
            await controller.createUser(req, res);

            expect(service.createUser).toBeCalledWith(queryMock);
            expect(res.status).toBeCalledWith(201);
            expect(res.send).toBeCalledWith(userMock);
        });
    });

    describe('updateUserById', (): void => {
        it('should call updateUserById method with proper params and send correct data', async () => {
            service.getUserById = jest.fn().mockResolvedValue(1);
            service.updateUserById = jest.fn().mockResolvedValue(userMock);
            await controller.updateUserById(req, res, next);

            expect(service.updateUserById).toBeCalledWith(queryMock, idMock.id);
            expect(res.send).toBeCalledWith(userMock);
        });

        it('should throw 404 error if user not found', async () => {
            service.getUserById = jest.fn().mockResolvedValue(null);
            await controller.updateUserById(req, res, next);

            expect(next).toBeCalledWith(new Error('Not found.'));
        });
    });

    describe('removeUserById', (): void => {
        it('should call removeUserById method with proper params and send message', async () => {
            service.getUserById = jest.fn().mockResolvedValue(1);
            await controller.removeUserById(req, res, next);

            expect(service.removeUserById).toBeCalledWith(idMock.id);
            expect(res.send).toBeCalledWith({ message: 'User has been deleted.' });
        });

        it('should throw 404 error if user not found', async () => {
            service.getUserById = jest.fn().mockResolvedValue(null);
            await controller.removeUserById(req, res, next);

            expect(next).toBeCalledWith(new Error('Not found.'));
        });
    });
});
