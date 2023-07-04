import { Injectable } from "@nestjs/common";

import { UsersRepository } from "@mongodb/repositories/users.repository";

@Injectable()
export class UsersService {
    constructor(private usersRepository: UsersRepository) {}

    async create(id: number, nickname: string) {
        return await this.usersRepository.createOne(id, nickname);
    }
}
