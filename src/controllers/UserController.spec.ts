import { NextFunction, Request, Response, Send } from 'express';
import UserService from '../services/User.service';
import UserController from './UserController';

// jest.mock('../services/UserServiceIndex');

describe('UserController', (): void => {
    let req: Request;
    let res: Response;
    let next: NextFunction;

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
        // const requestMock = {
        //     id: 1,
        //     login: 'ee',
        //     password: 'eee',
        //     age: 22,
        //     isDeleted: true,
        // };

        const mock = {
            login: 'ee',
            limit: '2'
        };

        req.query = mock;

        class UserServiceMock {
            getUsers = jest.fn();
        }
        const service = new UserServiceMock() as unknown as UserService;


        // const getUsersStub = jest.fn().mockResolvedValue(serviceRecord);
        // jest.mock('../services/User.service', () => class MockService {
        //     getUsers = getUsersStub;
        // })

        const controller = new UserController(service);


        await controller.getAutoSuggestUsers(req, res, next);

        expect(service.getUsers).toBeCalledWith(mock.login, mock.limit);
        // expect(UserService.getUsers).toBeCalled();

    });

});


