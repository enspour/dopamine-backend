import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { UsersService } from "@users/users.service";

import CreateUserDto from "./dto/create-user.dto";

@Controller()
export class AuthQueueController {
    constructor(private usersService: UsersService) {}

    @MessagePattern("auth.users.create")
    async handleCreateUser(@Payload() user: CreateUserDto) {
        return await this.usersService.createOne(user.id, user.nickname);
    }
}
