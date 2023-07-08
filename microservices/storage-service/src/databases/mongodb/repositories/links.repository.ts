import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { LinkEntity } from "@mongodb/schemas/link.schema";

@Injectable()
export class LinksRepository {
    constructor(
        @InjectModel(LinkEntity.name) private linkModel: Model<LinkEntity>,
    ) {}

    async createOne(fileId: string): Promise<LinkEntity> {
        const doc = new this.linkModel({
            file: fileId,
        });

        return await doc.save();
    }

    async removeOneById(id: string) {
        return await this.linkModel.deleteOne({ _id: id }).exec();
    }

    async findOneById(id: string): Promise<LinkEntity> {
        return await this.linkModel.findById(id).populate("file").exec();
    }
}
