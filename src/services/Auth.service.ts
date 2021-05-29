import User from '../model/user';

export default class AuthService {
    public async getCandidate(username: string, password: string): Promise<any> {
        return await User.findOne({
            where: {
                login: username,
                password: password,
            },
        });
    }
}
