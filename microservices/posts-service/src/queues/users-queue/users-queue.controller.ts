import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";

import { UsersQueueService } from "./users-queue.service";

import { UpdateUserFieldDto } from "./dto/update-user-field.dto";

@Controller()
export class UsersQueueController {
    constructor(private usersQueueService: UsersQueueService) {}

    @EventPattern("users.update.user.field")
    async handleUpdateUserName(@Payload() info: UpdateUserFieldDto) {
        await this.usersQueueService.updateUserField(info);
    }
}
