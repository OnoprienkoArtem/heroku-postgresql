import express, {Request, Response} from 'express';
import GroupUsers from "../model/group-users";
import sequelize from "../utils/database";

const groupUsersRouter = express.Router();


groupUsersRouter.post('/', async (req: Request, res: Response) => {

    try {
        await sequelize.transaction(async (t) => {
            await GroupUsers.create({
                userId: req.body.userId,
                groupId: req.body.groupId,
            }, { transaction: t });

            res.send(await GroupUsers.findAll());
        });
    } catch (error) {
        res.status(404).send(error);
    }
});

export default groupUsersRouter;
