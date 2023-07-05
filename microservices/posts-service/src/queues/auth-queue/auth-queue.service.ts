import { Injectable } from "@nestjs/common";

import { UsersService } from "@users/users.service";

import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class AuthQueueService {
    constructor(private usersService: UsersService) {}

    async createUser(user: CreateUserDto) {
        await this.usersService.create(user.id, user.nickname);
    }
}
