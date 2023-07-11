import { Injectable } from "@nestjs/common";

import { PostsRepository } from "@mongodb/repositories/posts.repository";

import { StorageService } from "@storage/storage.service";
import { Types } from "mongoose";

@Injectable()
export class PostsService {
    constructor(
        private postsRepository: PostsRepository,
        private storageService: StorageService,
    ) {}

    async create(text: string, images: string[], userId: number) {
        const post = await this.postsRepository.createOne(text, images, userId);

        await this.storageService.makePublicImages(images, userId);

        return post;
    }

    async remove(id: Types.ObjectId) {
        return await this.postsRepository.removeOneById(id);
    }

    async findOne(id: Types.ObjectId) {
        return await this.postsRepository.findOneById(id, {
            owner: true,
        });
    }

    async updateText(id: Types.ObjectId, text: string) {
        return await this.postsRepository.updateOne(id, "text", text);
    }

    async updateImages(id: Types.ObjectId, images: string[], userId: number) {
        const result = await this.postsRepository.updateOne(
            id,
            "images",
            images,
        );

        await this.storageService.makePublicImages(images, userId);

        return result;
    }

    async like(id: Types.ObjectId, userId: number) {
        return await this.postsRepository.like(id, userId);
    }

    async unlike(id: Types.ObjectId, userId: number) {
        return await this.postsRepository.unlike(id, userId);
    }
}
