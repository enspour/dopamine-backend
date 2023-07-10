import { Inject, Module } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";

import { StorageQueueProvider } from "./storage-queue.provider";
import { StorageQueueService } from "./storage-queue.service";

import constants from "@constants";

const { STORAGE_QUEUE } = constants.injections;

@Module({
    providers: [StorageQueueProvider, StorageQueueService],
    exports: [StorageQueueService],
})
export class StorageQueueModule {
    constructor(@Inject(STORAGE_QUEUE) private queue: ClientKafka) {}

    async onModuleInit() {
        try {
            this.queue.subscribeToResponseOf("storage.make.file.public");

            await this.queue.connect();
        } catch (e) {
            console.log(e);
            throw new Error("[AUTH QUEUE]: Connection error.");
        }
    }
}
