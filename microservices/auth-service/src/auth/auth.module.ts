import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";

import { AuthQueueModule } from "@auth-queue/auth-queue.module";
import { SessionsModule } from "@sessions/sessions.module";
import { TFAModule } from "@tfa/tfa.module";
import { UsersEmailsModule } from "@users-emails/users-emails.module";
import { UsersModule } from "@users/users.module";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

import { JwtAccessStrategy } from "./strategies/jwt-access.strategy";
import { JwtRefreshStrategy } from "./strategies/jwt-refresh.strategy";
import { LocalNotVerifiedStrategy } from "./strategies/local-not-verified.strategy";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
    imports: [
        AuthQueueModule,
        PassportModule,
        SessionsModule,
        TFAModule,
        UsersModule,
        UsersEmailsModule,
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        LocalStrategy,
        LocalNotVerifiedStrategy,
        JwtAccessStrategy,
        JwtRefreshStrategy,
    ],
})
export class AuthModule {}
