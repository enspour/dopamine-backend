import { Injectable } from "@nestjs/common";

import { UsersRepository } from "@postgres/repositories/users.repository";

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

    async createOne(nickname: string, email: string, hashedPassword: string) {
        return await this.usersRepository.createOne(
            nickname,
            email,
            hashedPassword,
        );
    }
}
