import { Injectable } from "@nestjs/common";

import { UsersService } from "@users/users.service";

import { UpdateUserFieldDto } from "./dto/update-user-field.dto";

import { userUpdatedFieldsNames } from "@interfaces";

@Injectable()
export class UsersQueueService {
    constructor(private usersService: UsersService) {}

    async updateUserField(info: UpdateUserFieldDto) {
        const { id, field, value } = info;

        if (userUpdatedFieldsNames.includes(field)) {
            return await this.usersService.update(id, field, value);
        }
    }
}
