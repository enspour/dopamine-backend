import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes, Types } from "mongoose";

import { BucketEntity, transformBucket } from "./bucket.schema";

import {
    FileAccess,
    FileExtension,
    fileAccesses,
    fileExtensions,
} from "@interfaces";

export type FileMetadataDocument = HydratedDocument<FileMetadataEntity>;

@Schema()
export class FileMetadataEntity {
    @Prop({ type: SchemaTypes.ObjectId })
    _id: Types.ObjectId;

    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true })
    size: number;

    @Prop({ type: Number, required: true })
    ownerId: number;

    @Prop({ type: String, required: true, enum: fileExtensions })
    extension: FileExtension;

    @Prop({
        type: String,
        required: true,
        enum: fileAccesses,
        default: "private",
    })
    access: FileAccess;

    @Prop({ type: String, ref: BucketEntity.name, required: true })
    bucket: string | BucketEntity;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;

    @Prop({ type: Date, default: Date.now })
    modifiedAt: Date;
}

export const FileMetadataSchema =
    SchemaFactory.createForClass(FileMetadataEntity);

export const transformFileMetadata = (obj: any) => {
    if (obj && typeof obj === "object" && "_id" in obj) {
        const file = { ...obj };

        file.id = file._id;
        delete file._id;

        file.bucket = transformBucket(file.bucket);

        return file;
    }

    return obj;
};

FileMetadataSchema.method("transform", function () {
    const obj = this.toObject();
    return transformFileMetadata(obj);
});
