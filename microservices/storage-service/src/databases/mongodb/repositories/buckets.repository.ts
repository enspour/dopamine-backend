import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { BucketEntity } from "@mongodb/schemas/bucket.schema";

import { Bucket } from "@interfaces";

@Injectable()
export class BucketsRepository {
    constructor(
        @InjectModel(BucketEntity.name)
        private bucketModel: Model<BucketEntity>,
    ) {}

    async createOne(name: string, users: number[]): Promise<Bucket> {
        const doc = new this.bucketModel({
            _id: name,
            users,
        });

        const bucket = await doc.save();

        return this.transform(bucket);
    }

    async removeOneByName(name: string) {
        const result = await this.bucketModel.deleteOne({ _id: name }).exec();

        if (result.deletedCount) {
            return true;
        }

        return false;
    }

    async findOneByName(name: string): Promise<Bucket | null> {
        const bucket = await this.bucketModel.findOne({ _id: name }).exec();

        if (bucket) {
            return this.transform(bucket);
        }

        return null;
    }

    private transform(bucket: BucketEntity): Bucket {
        if ("transform" in bucket && typeof bucket.transform === "function") {
            return bucket.transform();
        }

        throw new Error("Not found transform method");
    }
}
