import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

import { LinkEntity } from "@mongodb/schemas/link.schema";

import { Link } from "@interfaces";

@Injectable()
export class LinksRepository {
    constructor(
        @InjectModel(LinkEntity.name) private model: Model<LinkEntity>,
    ) {}

    async createOne(fileId: Types.ObjectId): Promise<Link> {
        const doc = new this.model({
            file: fileId,
        });

        const link = await doc.save();

        return this.transform(link);
    }

    async removeOneById(id: Types.ObjectId) {
        const result = await this.model.deleteOne({ _id: id }).exec();

        if (result.deletedCount) {
            return true;
        }

        return false;
    }

    async findOneById(id: Types.ObjectId): Promise<Link | null> {
        const link = await this.model
            .findOne({ _id: id })
            .populate({
                path: "file",
                populate: {
                    path: "bucket",
                },
            })
            .exec();

        if (link) {
            return this.transform(link);
        }

        return null;
    }

    private transform(link: LinkEntity): Link {
        if ("transform" in link && typeof link.transform === "function") {
            return link.transform();
        }

        throw new Error("Not found transform method");
    }
}
