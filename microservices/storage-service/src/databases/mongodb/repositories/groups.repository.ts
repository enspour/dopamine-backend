import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { GroupEntity } from "@mongodb/schemas/group.schema";

@Injectable()
export class GroupsRepository {
    constructor(
        @InjectModel(GroupEntity.name) private groupModel: Model<GroupEntity>,
    ) {}

    async createOne(
        name: string,
        users: number[],
        fileId: string,
    ): Promise<GroupEntity> {
        const doc = new this.groupModel({
            name,
            users,
            file: fileId,
        });

        return await doc.save();
    }

    async removeOneByName(name: string) {
        return await this.groupModel.deleteOne({ name }).exec();
    }

    async findOneByName(name: string): Promise<GroupEntity> {
        return await this.groupModel.findOne({ name }).populate("file").exec();
    }
}
