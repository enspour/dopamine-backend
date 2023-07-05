import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";

import { AuthQueueService } from "./auth-queue.service";

import { CreateUserDto } from "./dto/create-user.dto";

@Controller()
export class AuthQueueController {
    constructor(private authQueueService: AuthQueueService) {}

    @EventPattern("auth.create.user")
    async handleCreateUser(@Payload() user: CreateUserDto) {
        await this.authQueueService.createUser(user);
    }
}
