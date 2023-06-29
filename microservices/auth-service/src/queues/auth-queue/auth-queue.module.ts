import { Inject, Module } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";

import { AuthQueueProvider } from "./auth-queue.provider";
import { AuthQueueService } from "./auth-queue.service";

import constants from "@constants";

const { AUTH_QUEUE } = constants.injections;

@Module({
    controllers: [],
    providers: [AuthQueueProvider, AuthQueueService],
    exports: [AuthQueueService],
})
export class AuthQueueModule {
    constructor(@Inject(AUTH_QUEUE) private queue: ClientKafka) {}

    async onModuleInit() {
        this.queue.subscribeToResponseOf("auth.users.create");

        try {
            await this.queue.connect();
        } catch (e) {
            console.log(e);
            throw new Error("[AUTH QUEUE]: Connection error.");
        }
    }
}
