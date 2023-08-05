import { Module } from "@nestjs/common";

import { AuthModule } from "@auth/auth.module";
import { HealthCheckerModule } from "@health-checker/health-checker.module";
import { SessionsModule } from "@sessions/sessions.module";
import { TFAModule } from "@tfa/tfa.module";
import { UsersEmailsModule } from "@users-emails/users-emails.module";
import { UsersSecurityModule } from "@users-security/users-security.module";

import { UsersQueueModule } from "@users-queue/users-queue.module";

@Module({
    imports: [
        AuthModule,
        HealthCheckerModule,
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
