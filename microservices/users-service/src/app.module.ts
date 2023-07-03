import { Module } from "@nestjs/common";

import { AuthQueueModule } from "@auth-queue/auth-queue.module";
import { AuthModule } from "@auth/auth.module";
import { FollowersModule } from "@followers/followers.module";
import { FollowingsModule } from "@followings/followings.module";
import { UsersModule } from "@users/users.module";

@Module({
    imports: [
        AuthQueueModule,
        AuthModule,
        UsersModule,
        FollowingsModule,
        FollowersModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
