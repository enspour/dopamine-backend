import { Injectable } from "@nestjs/common";

import { UsersRepository } from "@postgres/repositories/users.repository";

import { UsersQueueService } from "@users-queue/users-queue.service";

@Injectable()
export class UsersService {
    constructor(
        private usersRepository: UsersRepository,
        private usersQueueService: UsersQueueService,
    ) {}

    async findOne(id: number) {
        return await this.usersRepository.findOneById(id);
    }

    async create(id: number, nickname: string) {
        return await this.usersRepository.createOne(id, nickname);
    }

    async updateName(id: number, name: string) {
        const result = await this.usersRepository.updateOneById(
            id,
            "name",
            name,
        );

        if (result.affected) {
            this.usersQueueService.updateUserInfo(id, "name", name);
        }

        return result.affected;
    }

    async updateNickname(id: number, nickname: string) {
        const result = await this.usersRepository.updateOneById(
            id,
            "nickname",
            nickname,
        );

        if (result.affected) {
            this.usersQueueService.updateUserInfo(id, "nickname", nickname);
        }

        return result.affected;
    }

    async updateStatus(id: number, status: string) {
        const result = await this.usersRepository.updateOneById(
            id,
            "status",
            status,
        );

        if (result.affected) {
            this.usersQueueService.updateUserInfo(id, "status", status);
        }

        return result.affected;
    }

    async updateAvatar(id: number, avatar: string) {
        const result = await this.usersRepository.updateOneById(
            id,
            "avatar",
            avatar,
        );

        if (result.affected) {
            this.usersQueueService.updateUserInfo(id, "avatar", avatar);
        }

        return result.affected;
    }
}
