import { Module } from "@nestjs/common";

import { StorageQueueController } from "./storage.queue.controller";

@Module({
    imports: [],
    controllers: [StorageQueueController],
})
export class StorageQueueModule {}
