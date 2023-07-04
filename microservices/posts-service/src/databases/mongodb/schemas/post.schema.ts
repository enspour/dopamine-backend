import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

import { User } from "./user.schema";

export type PostDocument = HydratedDocument<Post>;

export type PostFKNames = "owner" | "likes" | "comments";

@Schema()
export class Post implements Record<PostFKNames, any> {
    @Prop({ default: "" })
    text: string;

    @Prop({ type: [String], default: [] })
    images: string[];

    @Prop({
        type: [{ type: mongoose.Schema.Types.Number, ref: "User" }],
        default: [],
    })
    likes: User[];

    @Prop({ type: mongoose.Schema.Types.Number, ref: "User" })
    owner: User;

    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
        default: [],
    })
    comments: Post[];

    @Prop({ default: Date.now })
    created_at: Date;

    @Prop({ default: Date.now })
    modified_at: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
