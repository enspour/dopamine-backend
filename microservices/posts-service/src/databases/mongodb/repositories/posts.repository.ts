import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { PostEntity, PostEntityFKNames } from "@mongodb/schemas/post.schema";

@Injectable()
export class PostsRepository {
    constructor(
        @InjectModel(PostEntity.name) private postModel: Model<PostEntity>,
    ) {}

    async createOne(
        text: string,
        images: string[],
        ownerId: number,
    ): Promise<PostEntity> {
        const post = new this.postModel({
            text,
            images,
            owner: ownerId,
        });

        return await post.save();
    }

    async updateOne<T extends keyof PostEntity>(
        id: string,
        field: T,
        value: PostEntity[T],
    ) {
        return await this.postModel
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
    }

    async removeOneById(id: string) {
        return await this.postModel.deleteOne({ _id: id }).exec();
    }

    async findOneById<T extends PostEntityFKNames = never>(
        id: string,
        relations: Record<T, boolean> = <Record<T, boolean>>{},
    ): Promise<Omit<PostEntity, Exclude<PostEntityFKNames, T>> | null> {
        const query = this.postModel.findById(id);

        for (let relation in relations) {
            if (relations[relation]) {
                query.populate(relation);
            }
        }

        return await query.exec();
    }

    async like(id: string, userId: number) {
        return await this.postModel
            .updateOne(
                { _id: id },
                {
                    $addToSet: {
                        likes: userId,
                    },
                },
            )
            .exec();
    }

    async unlike(id: string, userId: number) {
        return await this.postModel
            .updateOne(
                { _id: id },
                {
                    $pull: {
                        likes: userId,
                    },
                },
            )
            .exec();
    }
}
