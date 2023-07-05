import { Injectable } from "@nestjs/common";

import { UsersRepository } from "@mongodb/repositories/users.repository";

import { User } from "@interfaces";

@Injectable()
export class UsersService {
    constructor(private usersRepository: UsersRepository) {}

    async create(id: number, nickname: string) {
        return await this.usersRepository.createOne(id, nickname);
    }

    async updateField<T extends keyof Omit<User, "id">>(
        id: number,
        field: T,
        value: User[T],
    ) {
        return await this.usersRepository.updateOne(id, field, value);
    }
}
