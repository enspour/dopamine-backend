import { Module } from "@nestjs/common";

import { UsersModule } from "@users/users.module";

import { AuthQueueController } from "./auth-queue.controller";

@Module({
    imports: [UsersModule],
    controllers: [AuthQueueController],
})
export class AuthQueueModule {}
