import { Module } from "@nestjs/common";

import { EmailQueueModule } from "@email-queue/email-queue.module";
import { PostgresModule } from "@postgres/postgres.module";
import { RedisModule } from "@redis/redis.module";
import { UsersModule } from "@users/users.module";

import { UsersEmailsController } from "./users-emails.controller";
import { UsersEmailsService } from "./users-emails.service";

@Module({
    imports: [RedisModule, PostgresModule, EmailQueueModule, UsersModule],
    controllers: [UsersEmailsController],
    providers: [UsersEmailsService],
    exports: [UsersEmailsService],
})
export class UsersEmailsModule {}
