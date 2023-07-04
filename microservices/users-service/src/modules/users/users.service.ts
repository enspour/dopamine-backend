import { Injectable } from "@nestjs/common";

import { UsersRepository } from "@postgres/repositories/users.repository";

@Injectable()
export class UsersService {
    constructor(private usersRepository: UsersRepository) {}

    async findOne(id: number) {
        return await this.usersRepository.findOneById(id);
    }

    async create(id: number, nickname: string) {
        return await this.usersRepository.createOne(id, nickname);
    }

    async updateName(id: number, name: string) {
        return await this.usersRepository.updateOneById(id, "name", name);
    }

    async updateNickname(id: number, nickname: string) {
        return await this.usersRepository.updateOneById(
            id,
            "nickname",
            nickname,
        );
    }

    async updateStatus(id: number, status: string) {
        return await this.usersRepository.updateOneById(id, "status", status);
    }

    async updateAvatar(id: number, avatar: string) {
        return await this.usersRepository.updateOneById(id, "avatar", avatar);
    }
}
