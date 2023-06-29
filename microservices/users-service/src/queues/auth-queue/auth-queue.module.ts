import { Module } from "@nestjs/common";

import { UsersModule } from "@users/users.module";

import { AuthQueueController } from "./auth-queue.controller";
import { AuthQueueService } from "./auth-queue.service";

@Module({
    imports: [UsersModule],
    controllers: [AuthQueueController],
    providers: [AuthQueueService],
    exports: [],
})
export class AuthQueueModule {}
