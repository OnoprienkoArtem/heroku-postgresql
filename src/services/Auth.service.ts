import User from '../model/user';

export default class AuthService {
    public async getCandidate(login: string): Promise<any> {
        return await User.findOne({
            where: {
                login
            }
        });
    }
}
