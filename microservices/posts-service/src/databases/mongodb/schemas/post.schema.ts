import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

import { UserEntity } from "./user.schema";

export type PostDocument = HydratedDocument<PostEntity>;

export type PostEntityFKNames = "owner" | "likes" | "comments";

@Schema()
export class PostEntity implements Record<PostEntityFKNames, any> {
    @Prop({ type: String, default: "" })
    text: string;

    @Prop({ type: [String], default: [] })
    images: string[];

    @Prop({ type: Number, ref: UserEntity.name })
    owner: UserEntity;

    @Prop({
        type: [{ type: Number, ref: UserEntity.name }],
        default: [],
    })
    likes: UserEntity[];

    @Prop({
        type: [{ type: Types.ObjectId, ref: PostEntity.name }],
        default: [],
    })
    comments: PostEntity[];

    @Prop({ type: Date, default: Date.now })
    created_at: Date;

    @Prop({ type: Date, default: Date.now })
    modified_at: Date;
}

export const PostSchema = SchemaFactory.createForClass(PostEntity);
