import { Module } from "@nestjs/common";

import { MongodbModule } from "@mongodb/mongodb.module";

import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";

@Module({
    imports: [MongodbModule],
    controllers: [PostsController],
    providers: [PostsService],
})
export class PostsModule {}
