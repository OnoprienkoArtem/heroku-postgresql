import sequelize from '../utils/database';
import GroupUsers from '../model/group-users';

export default class GroupUsersService {
    public async addUsersToGroup(userIds: Array<number>, groupId: string) {
        return await sequelize.transaction(async (t) => {
            await Promise.all(userIds.map(userId => GroupUsers.create({
                userId,
                groupId
            }, { transaction: t })));

            return await GroupUsers.findAll({ transaction: t });
        });
    }
}
