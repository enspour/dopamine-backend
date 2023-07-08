import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

import { FileEntity } from "./file.schema";

export type GroupDocument = HydratedDocument<GroupEntity>;

@Schema()
export class GroupEntity {
    @Prop({ type: String, unique: true, required: true })
    name: string;

    @Prop({ type: [Number], default: [] })
    users: number[];

    @Prop({ type: Types.ObjectId, ref: FileEntity.name, required: true })
    file: FileEntity;
}

export const GroupSchema = SchemaFactory.createForClass(GroupEntity);
