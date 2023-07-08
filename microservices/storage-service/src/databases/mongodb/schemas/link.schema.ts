import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

import { FileEntity } from "./file.schema";

export type LinkDocument = HydratedDocument<LinkEntity>;

@Schema()
export class LinkEntity {
    @Prop({ type: String, unique: true, required: true })
    link: string;

    @Prop({ type: Types.ObjectId, ref: FileEntity.name, required: true })
    file: FileEntity;

    @Prop({ type: Date, default: Date.now })
    created_at: Date;
}

export const LinkSchema = SchemaFactory.createForClass(LinkEntity);
