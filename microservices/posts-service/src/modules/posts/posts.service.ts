import { Injectable } from "@nestjs/common";

import { PostsRepository } from "@mongodb/repositories/posts.repository";
import { StorageQueueService } from "@storage-queue/storage-queue.service";

@Injectable()
export class PostsService {
    constructor(
        private postsRepository: PostsRepository,
        private storageQueueService: StorageQueueService,
    ) {}

    async create(text: string, images: string[], userId: number) {
        const post = await this.postsRepository.createOne(text, images, userId);

        const promises = images.map((image) =>
            this.storageQueueService.makeFilePublic(image, userId),
        );

        await Promise.allSettled(promises);

        return post;
    }

    async remove(id: string) {
        return await this.postsRepository.removeOneById(id);
    }

    async findOne(id: string) {
        return await this.postsRepository.findOneById(id, {
            owner: true,
        });
    }

    async updateText(id: string, text: string) {
        return await this.postsRepository.updateOne(id, "text", text);
    }

    async updateImages(id: string, images: string[]) {
        return await this.postsRepository.updateOne(id, "images", images);
    }

    async like(id: string, userId: number) {
        return await this.postsRepository.like(id, userId);
    }

    async unlike(id: string, userId: number) {
        return await this.postsRepository.unlike(id, userId);
    }
}
