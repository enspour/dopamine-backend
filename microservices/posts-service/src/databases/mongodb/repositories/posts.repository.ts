import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

import { PostEntity, PostEntityFKNames } from "@mongodb/schemas/post.schema";

import { Post } from "@interfaces";

@Injectable()
export class PostsRepository {
    constructor(
        @InjectModel(PostEntity.name) private postModel: Model<PostEntity>,
    ) {}

    async createOne(
        text: string,
        images: string[],
        ownerId: number,
    ): Promise<Post> {
        const doc = new this.postModel({
            text,
            images,
            owner: ownerId,
        });

        const post = await (await doc.save()).populate("owner");

        return this.transform(post);
    }

    async updateOne<T extends keyof PostEntity>(
        id: Types.ObjectId,
        field: T,
        value: PostEntity[T],
    ) {
        const result = await this.postModel
            .updateOne(
                { _id: id },
                {
                    $set: {
                        [field]: value,
                        modified_at: Date.now(),
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
        const result = await this.postModel.deleteOne({ _id: id }).exec();

        if (result.deletedCount) {
            return true;
        }

        return false;
    }

    async findOneById<T extends PostEntityFKNames = never>(
        id: Types.ObjectId,
        relations: Record<T, boolean> = <Record<T, boolean>>{},
    ): Promise<Omit<Post, Exclude<PostEntityFKNames, T>> | null> {
        const query = this.postModel.findById(id);

        for (let relation in relations) {
            if (relations[relation]) {
                query.populate(relation);
            }
        }

        const post = await query.exec();

        if (post) {
            return this.transform(post);
        }

        return null;
    }

    async findManyByUserIds<T extends PostEntityFKNames = never>(
        ids: number[],
        page: number,
        relations: Record<T, boolean> = <Record<T, boolean>>{},
    ): Promise<Omit<Post, Exclude<PostEntityFKNames, T>>[] | null> {
        const query = this.postModel
            .find({
                owner: { $in: ids },
            })
            .sort({ createdAt: -1 })
            .limit(10)
            .skip(page * 10);

        for (let relation in relations) {
            if (relations[relation]) {
                query.populate(relation);
            }
        }

        const posts = await query.exec();

        if (posts) {
            return posts.map(this.transform);
        }

        return null;
    }

    async like(id: Types.ObjectId, userId: number) {
        const result = await this.postModel
            .updateOne(
                { _id: id },
                {
                    $addToSet: {
                        likes: userId,
                    },
                },
            )
            .exec();

        if (result.modifiedCount) {
            return true;
        }

        return false;
    }

    async unlike(id: Types.ObjectId, userId: number) {
        const result = await this.postModel
            .updateOne(
                { _id: id },
                {
                    $pull: {
                        likes: userId,
                    },
                },
            )
            .exec();

        if (result.modifiedCount) {
            return true;
        }

        return false;
    }

    private transform(post: PostEntity): Post {
        if ("transform" in post && typeof post.transform === "function") {
            return post.transform();
        }

        throw new Error("Not found transform method");
    }
}
