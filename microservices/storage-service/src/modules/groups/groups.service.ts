import { Injectable } from "@nestjs/common";

import { GroupsRepository } from "@mongodb/repositories/groups.repository";

@Injectable()
export class GroupsService {
    constructor(private groupsRepository: GroupsRepository) {}

    async getGroup(name: string) {
        return await this.groupsRepository.findOneByName(name);
    }

    async createGroup(name: string, users: number[], fileId: string) {
        return await this.groupsRepository.createOne(name, users, fileId);
    }
}
