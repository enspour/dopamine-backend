import { Module } from "@nestjs/common";

import { UsersModule } from "@users/users.module";

import { UsersQueueController } from "./users-queue.controller";

@Module({
    imports: [UsersModule],
    controllers: [UsersQueueController],
})
export class UsersQueueModule {}
