import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

import { UserEntity } from "./user.schema";

export type PostDocument = HydratedDocument<PostEntity>;

export type PostEntityFKNames = "owner" | "likes" | "comments";

@Schema()
export class PostEntity implements Record<PostEntityFKNames, any> {
    @Prop({ default: "" })
    text: string;

    @Prop({ type: [String], default: [] })
    images: string[];

    @Prop({
        type: [{ type: mongoose.Schema.Types.Number, ref: "UserEntity" }],
        default: [],
    })
    likes: UserEntity[];

    @Prop({ type: mongoose.Schema.Types.Number, ref: "UserEntity" })
    owner: UserEntity;

    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "PostEntity" }],
        default: [],
    })
    comments: PostEntity[];

    @Prop({ default: Date.now })
    created_at: Date;

    @Prop({ default: Date.now })
    modified_at: Date;
}

export const PostSchema = SchemaFactory.createForClass(PostEntity);
