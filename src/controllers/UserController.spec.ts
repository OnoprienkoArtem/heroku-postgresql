import UserService from '../services/User.service';
import UserController from './UserController';

jest.mock('../services/User.service');

describe('UserController', (): void => {
    let req: Request;

    beforeEach(() => {
        req = {

        } as Request;

    });

    afterEach(() => {

    });


});

const userController = new UserController(new UserService());



it('should throw 400 error if id is empty string', async () => {

    const userService = new UserService();

    const requestMock = [
        {
            id: 1,
            login: 'ee',
            password: 'eee',
            age: 22,
            isDeleted: true,
        }
    ] as any;


    const reqMock = requestMock;
    const resMock = { send: jest.fn() } as any;
    const nextMock = jest.fn();

    await userController.getAutoSuggestUsers(reqMock, resMock, nextMock);

    expect(userService.getUsers).toBeCalled();

});
