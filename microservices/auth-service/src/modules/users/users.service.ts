import { Injectable } from "@nestjs/common";

import { UsersRepository } from "@postgres/repositories/users.repository";

import { User, UserUpdatedFieldsNames } from "@interfaces";

@Injectable()
export class UsersService {
    constructor(private usersRepository: UsersRepository) {}

    async findOneById(id: number) {
        return await this.usersRepository.findOneById(id);
    }

    async findOneByIdAll(id: number) {
        return await this.usersRepository.findOneById(id, {
            password: true,
            security: true,
            emails: true,
        });
    }

    async findOneByEmailAll(email: string) {
        return await this.usersRepository.findOneByEmail(email, {
            password: true,
            security: true,
            emails: true,
        });
    }

    async create(nickname: string, email: string, hashedPassword: string) {
        return await this.usersRepository.createOne(
            nickname,
            email,
            hashedPassword,
        );
    }

    async update<K extends UserUpdatedFieldsNames>(
        id: number,
        field: K,
        value: User[K],
    ) {
        return await this.usersRepository.updateOneById(id, field, value);
    }
}
