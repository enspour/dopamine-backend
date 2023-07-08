import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

import {
    FileAccess,
    FileExtension,
    fileAccesses,
    fileExtensions,
} from "@interfaces";

export type FileDocument = HydratedDocument<FileEntity>;

@Schema()
export class FileEntity {
    @Prop({ type: Types.ObjectId })
    _id: string;

    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true })
    size: number;

    @Prop({ type: Number, required: true })
    owner_id: number;

    @Prop({ type: String, required: true, enum: fileExtensions })
    extension: FileExtension;

    @Prop({ type: String, enum: fileAccesses, default: "denied" })
    access: FileAccess;

    @Prop({ type: Date, default: Date.now })
    created_at: Date;

    @Prop({ type: Date, default: Date.now })
    modified_at: Date;
}

export const FileSchema = SchemaFactory.createForClass(FileEntity);
