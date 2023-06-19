import { Module } from "@nestjs/common";

import { EmailQueueModule } from "@email-queue/email-queue.module";
import { RedisModule } from "@redis/redis.module";
import { SessionsModule } from "@sessions/sessions.module";

import { TFAController } from "./tfa.controller";
import { TFAService } from "./tfa.service";

@Module({
    imports: [SessionsModule, RedisModule, EmailQueueModule],
    controllers: [TFAController],
    providers: [TFAService],
    exports: [TFAService],
})
export class TFAModule {}
