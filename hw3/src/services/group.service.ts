import GroupModel from '../models/group.model';
import { GroupInterface } from "../interfaces/Group.interface";

export default class GroupService {
    static async getGroupById(id: number): Promise<GroupInterface> {
        const group = await GroupModel.findAll({
            raw: true,
            where: { id }
        });
        if (!group) throw new Error('Can\'t find a group by Id');
        return group;
    }

    static async getAllGroups(): Promise<GroupInterface[]> {
        const groups = await GroupModel.findAll({raw: true});
        if (!groups) throw new Error('Some problem with getting all groups');
        return groups;
    }

    static async createGroup(group: GroupInterface): Promise<GroupInterface> {
        const groupRecord = await GroupModel.create(group);
        if (!groupRecord) throw new Error('Group can\'t be created');
        return groupRecord;
    }

    static async updateGroup(group: GroupInterface): Promise<Array<number>> {
        const result = await GroupModel.update(group, {
            where: {id: group.id}
        });
        if (!result) throw new Error('Can\'t be updated');
        return result;
    }

    static async removeGroupById(id: number): Promise<number> {
        const result = await GroupModel.destroy({
            where: {id}
        });
        if (!result) throw new Error('Can\'t be deleted');
        return result;
    }
}
