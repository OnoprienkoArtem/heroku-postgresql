import express, {Request, Response} from 'express';
import { v4 as uuidv4 } from 'uuid';
import Group from "../model/group";
import GroupUsers from "../model/group-users";

const groupRouter = express.Router();

groupRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        res.json(await Group.findByPk(req.params.id));
    } catch (error) {
        res.status(404).send(error);
    }
});

groupRouter.get('/', async (req: Request, res: Response) => {
    try {
        res.json(await Group.findAll());
    } catch (error) {
        res.status(404).send(error);
    }
});

groupRouter.post('/', async (req: Request, res: Response) => {
    try {
        await Group.create({
            id: uuidv4(),
            name: req.body.name,
            permissions: req.body.permissions,
        });

        res.send(await Group.findAll());
    } catch (error) {
        res.status(404).send(error);
    }
});

groupRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const { name, permissions } = req.body;
        const id = req.params.id

        await Group.update(
            { name, permissions },
            {
                where: { id }
            }
        );

        res.json(await Group.findByPk(id));
    } catch (error) {
        res.status(404).send(error);
    }
});

groupRouter.delete('/:id', async (req: Request, res: Response) => {
    try {

        await GroupUsers.destroy({
            where: {
                groupId: req.params.id
            }
        });
        await Group.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({
            message: "Group deleted successfully"
        });
    } catch (error) {
        res.status(404).send(error);
    }
});

export default groupRouter;
