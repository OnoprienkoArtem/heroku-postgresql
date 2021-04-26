import User from '../model/user';
import { Op } from 'sequelize';
import QueryString from "qs";

type QueryStringType = string | string[] | QueryString.ParsedQs | QueryString.ParsedQs[] | undefined;

export default class UserService {
    public async getUsers(login: QueryStringType, limit: QueryStringType): Promise<void> {
        const defaultLimit: number = 2;
        let filteredUsers: any = await User.findAll({
            limit: Number(limit) || defaultLimit
        });

        if (login) {
            filteredUsers = await User.findAll({
                where: {
                    login: {
                        [Op.like]: `%${login}%`
                    }
                }
            });
        }

        return filteredUsers;
    }

    public async getUserById(id: string): Promise<any> {
        return await User.findByPk(id);
    }

    public async createUser(queryParams: any): Promise<any> {
        const { login, password, age } = queryParams;
        await User.create({
            login,
            password,
            age,
            isDeleted: false
        });

        return await User.findAll();
    }

    public async updateUserById(queryParams: any, id: string): Promise<any> {
        const { login, password, age } = queryParams;
        await User.update(
            { login, password, age },
            {
                where: { id }
            }
        );

        return User.findByPk(id);
    }

    public async removeUserById(id: string): Promise<any> {
        await User.update(
            {
                isDeleted: true
            },
            {
                where: { id }
            }
        );

        return User.findByPk(id);
    }

    public async handleIdError(id: string): Promise<any> {
        if (!await User.findByPk(id)) {
            throw new Error();
        }
    }
}
