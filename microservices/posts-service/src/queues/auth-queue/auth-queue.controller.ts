import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";

import { UsersService } from "@users/users.service";

import { CreateUserDto } from "./dto/create-user.dto";

@Controller()
export class AuthQueueController {
    constructor(private usersService: UsersService) {}

    @EventPattern("auth.create.user")
    async handleCreateUser(@Payload() user: CreateUserDto) {
        await this.usersService.create(user.id, user.nickname);
    }
}
