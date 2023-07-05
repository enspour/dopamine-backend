import { Module } from "@nestjs/common";

import { PostgresModule } from "@postgres/postgres.module";

import { UsersQueueModule } from "@users-queue/users-queue.module";

import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
    imports: [PostgresModule, UsersQueueModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
