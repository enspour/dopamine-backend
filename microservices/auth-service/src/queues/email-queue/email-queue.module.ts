import { Module } from "@nestjs/common";

import { EmailQueueProvider } from "./email-queue.provider";
import { EmailQueueService } from "./email-queue.service";

@Module({
    providers: [EmailQueueProvider, EmailQueueService],
    exports: [EmailQueueService],
})
export class EmailQueueModule {}
