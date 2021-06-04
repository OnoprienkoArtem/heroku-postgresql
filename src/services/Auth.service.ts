import User from '../model/user';

export default class AuthService {
    public async getUser(username: string, password: string): Promise<any> {
        return await User.findOne({
            where: {
                login: username,
                password: password,
            },
        });
    }

    public async getCandidate(login: string): Promise<any> {
        return await User.findOne({
            where: {
                login: login,
            },
        });
    }
}
