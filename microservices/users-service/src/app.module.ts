import { Module } from "@nestjs/common";

import { AuthModule } from "@auth/auth.module";
import { UsersModule } from "@users/users.module";
import { FollowersModule } from "./followers/followers.module";
import { FollowingsModule } from "./followings/followings.module";
import { AuthQueueModule } from "./queues/auth-queue/auth-queue.module";

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
