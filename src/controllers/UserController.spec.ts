import { NextFunction, Request, Response, Send } from 'express';
import UserService from '../services/User.service';
import UserController from './UserController';

// const requestMock = {
//     id: 1,
//     login: 'ee',
//     password: 'eee',
//     age: 22,
//     isDeleted: true,
// };

describe('UserController', (): void => {
    let req: Request;
    let res: Response;
    let next: NextFunction;

    class UserServiceMock {
        getUsers = jest.fn();
        getUserById = jest.fn();
        createUser = jest.fn();
    }

    const mock = {
        login: 'testLogin',
        limit: '2'
    };

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

    it('getAutoSuggestUsers', async () => {
        req.query = mock;

        await controller.getAutoSuggestUsers(req, res, next);

        expect(service.getUsers).toBeCalledWith(mock.login, mock.limit);
    });

    it('getUserById', async () => {
        const idMock = {
            id: 2,
        } as any;

        req.params = idMock;

        await controller.getUserById(req, res, next);

        expect(service.getUserById).toBeCalledWith(idMock.id);
    });

    it('createUser', async () => {
        req.query = mock;

        await controller.createUser(req, res);

        expect(service.createUser).toBeCalledWith(mock);
    });

});


