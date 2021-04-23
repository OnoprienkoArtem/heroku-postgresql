import {Request} from "express";
import User from "../model/user";
import {Op} from "sequelize";

export default class UserService {

    public async getUsers(req: Request): Promise<void> {
        const defaultLimit: number = 2;
        let filteredUsers: any = await User.findAll({
            limit: Number(req.query.limit) || defaultLimit
        });

        if (req.query.login) {
            filteredUsers = await User.findAll({
                where: {
                    login: {
                        [Op.like]: `%${req.query.login}%`
                    }
                }
            });
        }

        return filteredUsers;
    }

    public async getUserById(req: Request): Promise<any> {
        return await User.findByPk(req.params.id)
    }

    public async createUser(req: Request): Promise<any> {
        const { login, password, age } = req.query;

        await User.create({
            login,
            password,
            age,
            isDeleted: false
        });

        return await User.findAll();
    }

    public async updateUserById(req: Request): Promise<any> {
        const { login, password, age } = req.query;

        await User.update(
            { login, password, age },
            {
                where: { id: req.params.id }
            }
        );

        return User.findByPk(req.params.id);
    }

    public async removeUserById(req: Request): Promise<any> {
        await User.update(
            {
                isDeleted: true
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );

        return User.findByPk(req.params.id);
    }

    public async handleIdError(id: string): Promise<any> {
        if (!await User.findByPk(id)) {
            throw new Error();
        }
    }
}
