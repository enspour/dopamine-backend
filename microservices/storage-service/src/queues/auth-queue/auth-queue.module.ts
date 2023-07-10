import { Module } from "@nestjs/common";

import { BucketsModule } from "@buckets/buckets.module";

import { AuthQueueController } from "./auth-queue.controller";

@Module({
    imports: [BucketsModule],
    controllers: [AuthQueueController],
    providers: [],
})
export class AuthQueueModule {}
