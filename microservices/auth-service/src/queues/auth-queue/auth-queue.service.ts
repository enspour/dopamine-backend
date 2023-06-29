import { Inject, Injectable } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";

import constants from "@constants";

const { AUTH_QUEUE } = constants.injections;

@Injectable()
export class AuthQueueService {
    constructor(@Inject(AUTH_QUEUE) private queue: ClientKafka) {}

    async createUser(id: number, nickname: string) {
        return await this.sendAsync("auth.users.create", { id, nickname });
    }

    async sendAsync(pattern: any, data: any) {
        return await new Promise((resolve) => {
            this.queue.send(pattern, data).subscribe((value) => {
                resolve(value);
            });
        });
    }
}
