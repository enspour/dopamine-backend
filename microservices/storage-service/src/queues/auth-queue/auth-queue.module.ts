import { Module } from "@nestjs/common";

import { BucketsModule } from "@buckets/buckets.module";

import { AuthQueueController } from "./auth-queue.controller";
import { AuthQueueService } from "./auth-queue.service";

@Module({
    imports: [BucketsModule],
    controllers: [AuthQueueController],
    providers: [AuthQueueService],
    exports: [],
})
export class AuthQueueModule {}
