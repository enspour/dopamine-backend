import { Module } from "@nestjs/common";

import { MongodbModule } from "@mongodb/mongodb.module";
import { StorageModule } from "@storage/storage.module";

import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";

@Module({
    imports: [MongodbModule, StorageModule],
    controllers: [PostsController],
    providers: [PostsService],
})
export class PostsModule {}
