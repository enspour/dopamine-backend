import { Module } from "@nestjs/common";

import { MongodbModule } from "@mongodb/mongodb.module";

import { StorageQueueModule } from "@storage-queue/storage-queue.module";

import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";

@Module({
    imports: [MongodbModule, StorageQueueModule],
    controllers: [PostsController],
    providers: [PostsService],
})
export class PostsModule {}
