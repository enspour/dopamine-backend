import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

import { UserEntity, transformUser } from "./user.schema";

import { FileMetadata } from "@interfaces";

export type PostDocument = HydratedDocument<PostEntity>;

export type PostEntityFKNames = "owner" | "likes" | "comments";

@Schema()
export class PostEntity {
    @Prop({ type: String, default: "" })
    text: string;

    @Prop({ type: [Object], default: [] })
    files: FileMetadata[];

    @Prop({ type: Number, ref: UserEntity.name })
    owner: UserEntity;

    @Prop({ type: [{ type: Number, ref: UserEntity.name }], default: [] })
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
        post.likes = post.likes.map(transformUser);
        post.comments = post.comments.map(transformPost);

        return post;
    }

    return obj;
};

PostSchema.method("transform", function () {
    const obj = this.toObject();
    return transformPost(obj);
});
