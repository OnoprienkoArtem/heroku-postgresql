import { NextFunction, Request, Response, Send } from 'express';
import UserService from '../services/UserServiceIndex';
import { getAutoSuggestUsers } from './UserController';

jest.mock('../services/UserServiceIndex');

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
        // const reqMock = {} as Request;
        // const resMock = {} as Response;
        // const nextMock = jest.fn();
        //
        // const requestMock = {
        //     id: 1,
        //     login: 'ee',
        //     password: 'eee',
        //     age: 22,
        //     isDeleted: true,
        // };

        const mock = {
            login: 'ee',
        };

        jest.spyOn(UserService, 'getUsers').mockResolvedValueOnce(mock);
        req.query = mock;

        await getAutoSuggestUsers(req, res, next);

        // expect(UserService.getUsers).toBeCalledWith(mock);
        // expect(UserService.getUsers).toBeCalledWith(mock);

    });

});


