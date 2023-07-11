import { Injectable } from "@nestjs/common";

import { UsersRepository } from "@mongodb/repositories/users.repository";

import {
    User,
    UserUpdatedFieldsNames,
    userUpdatedFieldsNames,
} from "@interfaces";

@Injectable()
export class UsersService {
    constructor(private usersRepository: UsersRepository) {}

    async create(id: number, nickname: string) {
        return await this.usersRepository.createOne(id, nickname);
    }

    async update<K extends UserUpdatedFieldsNames>(
        id: number,
        field: K,
        value: User[K],
    ) {
        if (userUpdatedFieldsNames.includes(field)) {
            return await this.usersRepository.updateOne(id, field, value);
        }

        return false;
    }
}
