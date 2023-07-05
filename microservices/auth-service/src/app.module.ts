import { Module } from "@nestjs/common";

import { AuthModule } from "@auth/auth.module";
import { SessionsModule } from "@sessions/sessions.module";
import { TFAModule } from "@tfa/tfa.module";
import { UsersEmailsModule } from "@users-emails/users-emails.module";
import { UsersQueueModule } from "@users-queue/users-queue.module";
import { UsersSecurityModule } from "@users-security/users-security.module";

@Module({
    imports: [
        AuthModule,
        SessionsModule,
        TFAModule,
        UsersEmailsModule,
        UsersSecurityModule,
        UsersQueueModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
