import { Inject, Module } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";

import { UsersQueueProvider } from "./users-queue.provider";
import { UsersQueueService } from "./users-queue.service";

import constants from "@constants";

const { USERS_QUEUE } = constants.injections;

@Module({
    controllers: [],
    providers: [UsersQueueProvider, UsersQueueService],
    exports: [UsersQueueService],
})
export class UsersQueueModule {
    constructor(@Inject(USERS_QUEUE) private queue: ClientKafka) {}

    async onModuleInit() {
        try {
            await this.queue.connect();
        } catch (e) {
            console.log(e);
            throw new Error("[AUTH QUEUE]: Connection error.");
        }
    }
}
