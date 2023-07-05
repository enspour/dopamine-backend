import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { PostEntity, PostSchema } from "./schemas/post.schema";
import { UserEntity, UserSchema } from "./schemas/user.schema";

import { PostsRepository } from "./repositories/posts.repository";
import { UsersRepository } from "./repositories/users.repository";

import configs from "@configs";

const { host, port, pass, user, db } = configs.mongodb;

@Module({
    imports: [
        MongooseModule.forRoot(
            `mongodb://${user}:${pass}@${host}:${port}/${db}?authSource=admin`,
        ),
        MongooseModule.forFeature([
            { name: UserEntity.name, schema: UserSchema },
            { name: PostEntity.name, schema: PostSchema },
        ]),
    ],
    providers: [UsersRepository, PostsRepository],
    exports: [UsersRepository, PostsRepository],
})
export class MongodbModule {}
