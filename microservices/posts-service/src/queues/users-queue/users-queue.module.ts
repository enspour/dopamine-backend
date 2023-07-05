import { Module } from "@nestjs/common";

import { UsersModule } from "@users/users.module";

import { UsersQueueController } from "./users-queue.controller";
import { UsersQueueService } from "./users-queue.service";

@Module({
    imports: [UsersModule],
    controllers: [UsersQueueController],
    providers: [UsersQueueService],
})
export class UsersQueueModule {}
