import { Module } from "@nestjs/common";

import { AuthQueueModule } from "@auth-queue/auth-queue.module";
import { AuthModule } from "@auth/auth.module";
import { PostsModule } from "@posts/posts.module";
import { UsersQueueModule } from "@users-queue/users-queue.module";

@Module({
    imports: [AuthQueueModule, UsersQueueModule, AuthModule, PostsModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
