import { NextFunction, Request, Response, Send } from 'express';
import UserService from '../services/User.service';
import UserController from './UserController';



describe('UserController', (): void => {
    let req: Request;
    let res: Response;
    let next: NextFunction;

    const requestMock = {
        id: 1,
        login: 'ee',
        password: 'eee',
        age: 22,
        isDeleted: true,
    };

    const mock = {
        login: 'testLogin',
        limit: '2'
    };

    class UserServiceMock {
        getUsers = jest.fn();
        getUserById = jest.fn();
        createUser = jest.fn();
    }

    const service = new UserServiceMock() as unknown as UserService;
    const controller = new UserController(service);

    beforeEach(() => {
        req = {
            params: {},
        } as Request;

        res = {
            json: jest.fn() as Send,
            send: jest.fn() as Send,
            status: jest.fn().mockImplementation(() => res) as Send
        } as Response;

        next = jest.fn() as NextFunction;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAutoSuggestUsers', (): void => {
        beforeEach(() => {
            req.query = mock;
        });

        it('should call getUsers method with proper params', async () => {
            await controller.getAutoSuggestUsers(req, res, next);

            expect(service.getUsers).toBeCalledWith(mock.login, mock.limit);
        });

        it('should send correct data', async () => {
            service.getUsers = jest.fn().mockResolvedValue( [requestMock]);
            await controller.getAutoSuggestUsers(req, res, next);

            expect(res.send).toBeCalledWith([requestMock]);
        });

        it('should throw 404 error if users not found', async () => {
            service.getUsers = jest.fn().mockResolvedValue( []);
            await controller.getAutoSuggestUsers(req, res, next);

            expect(next).toBeCalledWith(new Error('Not found.'));
        });
    });

    describe('getUserById', (): void => {
        it('should call getUserById method with proper params', async () => {
            const idMock = {
                id: 1,
            } as any;

            req.params = idMock;

            await controller.getUserById(req, res, next);

            expect(service.getUserById).toBeCalledWith(idMock.id);
        });

        it('should send json correct data', async () => {
            service.getUserById = jest.fn().mockResolvedValue(requestMock);
            await controller.getUserById(req, res, next);

            expect(res.json).toBeCalledWith(requestMock);
        });

        it('should throw 404 error if user not found', async () => {
            service.getUserById = jest.fn().mockResolvedValue(null);
            await controller.getUserById(req, res, next);

            expect(next).toBeCalledWith(new Error('Not found.'));
        });
    });



    it('createUser', async () => {
        req.query = mock;

        await controller.createUser(req, res);

        expect(service.createUser).toBeCalledWith(mock);
    });

});


