import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";

import { PostsRepository } from "@mongodb/repositories/posts.repository";

import { StorageService } from "@storage/storage.service";

import { FileMetadata } from "@interfaces";

@Injectable()
export class PostsService {
    constructor(
        private postsRepository: PostsRepository,
        private storageService: StorageService,
    ) {}

    async create(text: string, files: FileMetadata[], userId: number) {
        const post = await this.postsRepository.createOne(text, files, userId);

        if (files.length > 0) {
            await this.storageService.makeFilePublic(files, userId);
        }

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

    async findManyByUserIds(ids: number[], from: number, to: number) {
        return await this.postsRepository.findManyByUserIds(ids, from, to, {
            owner: true,
        });
    }

    async updateText(id: Types.ObjectId, text: string) {
        return await this.postsRepository.updateOne(id, "text", text);
    }

    async updateFiles(
        id: Types.ObjectId,
        files: FileMetadata[],
        userId: number,
    ) {
        const result = await this.postsRepository.updateOne(id, "files", files);

        if (files.length > 0) {
            await this.storageService.makeFilePublic(files, userId);
        }

        return result;
    }

    async like(id: Types.ObjectId, userId: number) {
        return await this.postsRepository.like(id, userId);
    }

    async unlike(id: Types.ObjectId, userId: number) {
        return await this.postsRepository.unlike(id, userId);
    }
}
