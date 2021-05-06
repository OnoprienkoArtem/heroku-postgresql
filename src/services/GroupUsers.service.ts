import sequelize from '../utils/database';
import GroupUsers from '../model/group-users';

export default class GroupUsersService {
    public async addUsersToGroup(userIds: Array<number>, groupId: string) {
        await sequelize.transaction(async (t) => {
            await GroupUsers.create({
                userIds,
                groupId
            }, { transaction: t });

            return await GroupUsers.findAll();
        });
    }
}
