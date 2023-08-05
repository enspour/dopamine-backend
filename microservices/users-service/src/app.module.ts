import { Module } from "@nestjs/common";

import { AuthModule } from "@auth/auth.module";
import { FollowersModule } from "@followers/followers.module";
import { FollowingsModule } from "@followings/followings.module";
import { HealthCheckerModule } from "@health-checker/health-checker.module";
import { UsersModule } from "@users/users.module";

import { AuthQueueModule } from "@auth-queue/auth-queue.module";

@Module({
    imports: [
        AuthModule,
        FollowingsModule,
        FollowersModule,
        HealthCheckerModule,
        UsersModule,

        AuthQueueModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
