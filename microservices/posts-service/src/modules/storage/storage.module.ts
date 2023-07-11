import { Module } from "@nestjs/common";

import { StorageQueueModule } from "@storage-queue/storage-queue.module";

import { StorageService } from "./storage.service";

@Module({
    imports: [StorageQueueModule],
    providers: [StorageService],
    exports: [StorageService],
})
export class StorageModule {}
