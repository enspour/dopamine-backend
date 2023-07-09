import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { BucketEntity } from "@mongodb/schemas/bucket.schema";

@Injectable()
export class BucketsRepository {
    constructor(
        @InjectModel(BucketEntity.name)
        private bucketModel: Model<BucketEntity>,
    ) {}

    async createOne(id: string, users: number[]): Promise<BucketEntity> {
        const doc = new this.bucketModel({
            _id: id,
            users,
        });

        return await doc.save();
    }

    async removeOneById(id: string) {
        return await this.bucketModel.deleteOne({ _id: id }).exec();
    }

    async findOneById(id: string): Promise<BucketEntity> {
        return await this.bucketModel.findOne({ _id: id }).exec();
    }
}
