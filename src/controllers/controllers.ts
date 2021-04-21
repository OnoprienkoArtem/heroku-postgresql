import { Request, Response } from 'express';
import User from '../model/user';

export async function getAutoSuggestUsers(req: Request, res: Response): Promise<void> {
    try {
        const defaultLimit: number = 2;
        let filteredUsers: any = await User.findAll();

        if (req.query.login) {
            filteredUsers = filteredUsers.filter((user: any) => user.login.includes(req.query.login));
        }

        res.send(await filteredUsers.slice(0, (Number(req.query.limit) || defaultLimit)));
    } catch (error) {
        res.status(404).send(error);
    }
}

export async function getUserById(req: Request, res: Response): Promise<void> {
    try {
        await handleIdError(req.params.id);

        res.json(await User.findByPk(req.params.id));
    } catch (error) {
        res.status(404).json({ message: 'id not found' });
    }
}

export async function createUser(req: Request, res: Response): Promise<void> {
    try {
        const { login, password, age } = req.query;
        await User.create({
            login,
            password,
            age,
            isDeleted: false
        });

        res.send(await User.findAll());
    } catch (error) {
        res.status(404).send(error);
    }
}

export async function updateUserById(req: Request, res: Response): Promise<void> {
    try {
        await handleIdError(req.params.id);

        const { login, password, age } = req.query;

        await User.update(
            { login, password, age },
            {
                where: { id: req.params.id }
            }
        );

        res.send(await User.findByPk(req.params.id));
    } catch (error) {
        res.status(404).json({ message: 'id not found' });
    }
}

export async function removeUserById(req: Request, res: Response): Promise<void> {
    try {
        await handleIdError(req.params.id);

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

        res.send(await User.findAll());
    } catch (error) {
        res.status(404).json({ message: 'id not found' });
    }
}

async function handleIdError(id: string): Promise<void> {
    if (!await User.findByPk(id)) {
        throw new Error();
    }
}
