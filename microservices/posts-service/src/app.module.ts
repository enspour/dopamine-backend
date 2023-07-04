import { Module } from "@nestjs/common";

import { AuthQueueModule } from "@auth-queue/auth-queue.module";
import { AuthModule } from "@auth/auth.module";
import { PostsModule } from "@posts/posts.module";

@Module({
    imports: [AuthModule, AuthQueueModule, PostsModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
