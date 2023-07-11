import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

import { UserEntity, transformUser } from "./user.schema";

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
    createdAt: Date;

    @Prop({ type: Date, default: Date.now })
    modifiedAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(PostEntity);

export const transformPost = (obj) => {
    if (obj && typeof obj === "object" && "_id" in obj) {
        const post = { ...obj };

        post.id = post._id;
        delete post._id;

        post.owner = transformUser(post.owner);
        post.likes = post.likes.map((user) => transformUser(user));
        post.comments = post.comments.map((comment) => transformPost(comment));

        return post;
    }

    return obj;
};

PostSchema.method("transform", function () {
    const obj = this.toObject();
    return transformPost(obj);
});
