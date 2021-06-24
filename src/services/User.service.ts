import { Op } from 'sequelize';
import QueryString from 'qs';

import { UserType } from '../types/user';

import User from '../model/user';
import Group from '../model/group';

type QueryStringType = string | string[] | QueryString.ParsedQs | QueryString.ParsedQs[] | undefined;

export default class UserService {
    public async getUsers(login: QueryStringType = '', limit: QueryStringType): Promise<any> {
        const defaultLimit: number = 2;

        return await User.findAll({
            limit: Number(limit) || defaultLimit,
            where: {
                login: {
                    [Op.like]: `%${login}%`
                }
            },
            include: Group
        });
    }

    public async getUserById(id: number): Promise<any> {
        return await User.findByPk(id);
    }

    public async createUser(queryParams: any): Promise<any> {
        const { login, password, age }: UserType = queryParams;
        return await User.create({
            login,
            password,
            age,
            isDeleted: false
        });
    }

    public async updateUserById(queryParams: any, id: string): Promise<any> {
        const { login, password, age }: UserType = queryParams;
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
}
