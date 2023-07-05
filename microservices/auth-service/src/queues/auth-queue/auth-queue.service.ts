import { Inject, Injectable } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";

import { CreateUserDto } from "./dto/create-user.dto";

import constants from "@constants";

const { AUTH_QUEUE } = constants.injections;

@Injectable()
export class AuthQueueService {
    constructor(@Inject(AUTH_QUEUE) private queue: ClientKafka) {}

    createUser(id: number, nickname: string) {
        const user: CreateUserDto = { id, nickname };

        const data = JSON.stringify(user);

        this.queue.emit("auth.create.user", data);
    }
}
