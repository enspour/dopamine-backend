import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

import { FileMetadataEntity } from "@mongodb/schemas/file-metadata.schema";

import { FileExtension, FileMetadata } from "@interfaces";

@Injectable()
export class FileMetadataRepository {
    constructor(
        @InjectModel(FileMetadataEntity.name)
        private model: Model<FileMetadataEntity>,
    ) {}

    async createOne(
        id: Types.ObjectId,
        name: string,
        size: number,
        extension: FileExtension,
        bucket: string,
        ownerId: number,
    ): Promise<FileMetadata> {
        const doc = new this.model({
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

    async updateOne<T extends keyof FileMetadataEntity>(
        id: Types.ObjectId,
        field: T,
        value: FileMetadataEntity[T],
    ) {
        const result = await this.model
            .updateOne(
                { _id: id },
                {
                    $set: {
                        [field]: value,
                        modifiedAt: Date.now(),
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
        const result = await this.model.deleteOne({ _id: id }).exec();

        if (result.deletedCount) {
            return true;
        }

        return false;
    }

    async findOneById(id: Types.ObjectId): Promise<FileMetadata | null> {
        const file = await this.model
            .findOne({ _id: id })
            .populate("bucket")
            .exec();

        if (file) {
            return this.transform(file);
        }

        return null;
    }

    private transform(file: FileMetadataEntity): FileMetadata {
        if ("transform" in file && typeof file.transform === "function") {
            return file.transform();
        }

        throw new Error("Not found transform method");
    }
}
