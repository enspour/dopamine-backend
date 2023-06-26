import { Module } from "@nestjs/common";

import { MailerProvider } from "./mailer.provider";
import { MailerService } from "./mailer.service";

@Module({
    providers: [MailerProvider, MailerService],
    exports: [MailerService],
})
export class MailerModule {}
