import { Inject, Module } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

import { EmailQueueProvider } from "./email-queue.provider";
import { EmailQueueService } from "./email-queue.service";

import constants from "@constants";

const { EMAIL_QUEUE } = constants.injections;

@Module({
    providers: [EmailQueueProvider, EmailQueueService],
    exports: [EmailQueueService],
})
export class EmailQueueModule {
    constructor(@Inject(EMAIL_QUEUE) private queue: ClientProxy) {}

    async onModuleInit() {
        try {
            await this.queue.connect();
        } catch (e) {
            console.log(e);
            throw new Error("[EMAIL QUEUE]: Connection error.");
        }
    }
}
