import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";

import { UsersService } from "@users/users.service";

import { UpdateUserFieldDto } from "./dto/update-user-field.dto";

@Controller()
export class UsersQueueController {
    constructor(private usersService: UsersService) {}

    @EventPattern("users.update.user.field")
    async handleUpdateUserName(@Payload() info: UpdateUserFieldDto) {
        const { id, field, value } = info;
        return await this.usersService.update(id, field, value);
    }
}
