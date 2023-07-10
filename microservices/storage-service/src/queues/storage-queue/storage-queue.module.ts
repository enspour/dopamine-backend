import { Module } from "@nestjs/common";

import { FilesModule } from "@files/files.module";

import { StorageQueueController } from "./storage.queue.controller";

@Module({
    imports: [FilesModule],
    controllers: [StorageQueueController],
    providers: [],
})
export class StorageQueueModule {}
