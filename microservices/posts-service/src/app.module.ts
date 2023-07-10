import { Module } from "@nestjs/common";

import { AuthModule } from "@auth/auth.module";
import { PostsModule } from "@posts/posts.module";

import { AuthQueueModule } from "@auth-queue/auth-queue.module";
import { UsersQueueModule } from "@users-queue/users-queue.module";

@Module({
    imports: [AuthModule, PostsModule, AuthQueueModule, UsersQueueModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
