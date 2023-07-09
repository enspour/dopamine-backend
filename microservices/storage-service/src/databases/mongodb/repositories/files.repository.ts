import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { FileEntity } from "@mongodb/schemas/file.schema";

import { FileExtension } from "@interfaces";

@Injectable()
export class FilesRepository {
    constructor(
        @InjectModel(FileEntity.name) private fileModel: Model<FileEntity>,
    ) {}

    async createOne(
        id: string,
        name: string,
        size: number,
        extension: FileExtension,
        bucket_id: string,
        owner_id: number,
    ): Promise<FileEntity> {
        const doc = new this.fileModel({
            _id: id,
            name,
            size,
            extension,
            bucket: bucket_id,
            owner_id,
        });
        return await doc.save();
    }

    async updateOne<T extends keyof FileEntity>(
        id: string,
        field: T,
        value: FileEntity[T],
    ) {
        return await this.fileModel
            .updateOne(
                { _id: id },
                {
                    $set: {
                        [field]: value,
                        modified_at: Date.now(),
                    },
                },
            )
            .exec();
    }

    async removeOneById(id: string) {
        return await this.fileModel.deleteOne({ _id: id }).exec();
    }

    async findOneById(id: string): Promise<FileEntity> {
        return await this.fileModel.findById(id).populate("bucket").exec();
    }
}
