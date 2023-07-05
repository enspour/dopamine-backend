import { Inject, Injectable } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";

import { UpdateUserFieldDto } from "./dto/update-user-field.dto";

import { User, UserUpdatedFieldsNames } from "@interfaces";

import constants from "@constants";

const { USERS_QUEUE } = constants.injections;

@Injectable()
export class UsersQueueService {
    constructor(@Inject(USERS_QUEUE) private queue: ClientKafka) {}

    updateUserInfo<T extends UserUpdatedFieldsNames>(
        id: number,
        field: T,
        value: User[T],
    ) {
        const info: UpdateUserFieldDto = {
            id,
            field,
            value,
        };

        const data = JSON.stringify(info);

        this.queue.emit("users.update.user.field", data);
    }
}
