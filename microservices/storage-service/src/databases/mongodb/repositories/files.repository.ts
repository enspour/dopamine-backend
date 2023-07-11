import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

import { FileEntity } from "@mongodb/schemas/file.schema";

import { File, FileExtension } from "@interfaces";

@Injectable()
export class FilesRepository {
    constructor(
        @InjectModel(FileEntity.name) private fileModel: Model<FileEntity>,
    ) {}

    async createOne(
        id: Types.ObjectId,
        name: string,
        size: number,
        extension: FileExtension,
        bucket: string,
        ownerId: number,
    ): Promise<File> {
        const doc = new this.fileModel({
            _id: id,
            name,
            size,
            extension,
            bucket,
            ownerId,
        });

        const file = await doc.save();

        return this.transform(file);
    }

    async updateOne<T extends keyof FileEntity>(
        id: Types.ObjectId,
        field: T,
        value: FileEntity[T],
    ) {
        const result = await this.fileModel
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

        if (result.modifiedCount) {
            return true;
        }

        return false;
    }

    async removeOneById(id: Types.ObjectId) {
        const result = await this.fileModel.deleteOne({ _id: id }).exec();

        if (result.deletedCount) {
            return true;
        }

        return false;
    }

    async findOneById(id: Types.ObjectId): Promise<File | null> {
        const file = await this.fileModel
            .findOne({ _id: id })
            .populate("bucket")
            .exec();

        if (file) {
            return this.transform(file);
        }

        return null;
    }

    private transform(file: FileEntity): File {
        if ("transform" in file && typeof file.transform === "function") {
            return file.transform();
        }

        throw new Error("Not found transform method");
    }
}
