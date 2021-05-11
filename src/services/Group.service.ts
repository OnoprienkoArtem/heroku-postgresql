import { v4 as uuidv4 } from 'uuid';

import Group from '../model/group';
import GroupUsers from '../model/group-users';
import User from '../model/user';

export default class GroupService {
    public async getGroupById(id: string) {
        return await Group.findByPk(id);
    }

    public async getAllGroups() {
        return await Group.findAll({
            include: User
        });
    }

    public async createNewGroup(name: string, permissions: Array<string>) {
        return await Group.create({
            id: uuidv4(),
            name,
            permissions
        });
    }

    public async updateGroupById(id: string, name: string, permissions: Array<string>) {
        await Group.update(
            { name, permissions },
            {
                where: { id }
            }
        );

        return await Group.findByPk(id);
    }

    public async removeGroupById(id: string) {
        await GroupUsers.destroy({
            where: { groupId: id }
        });
        await Group.destroy({
            where: { id }
        });
    }
}
