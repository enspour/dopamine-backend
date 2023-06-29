import { Module } from "@nestjs/common";

import { PostgresModule } from "@postgres/postgres.module";
import { UsersModule } from "@users/users.module";

import { FollowingsController } from "./followings.controller";
import { FollowingsService } from "./followings.service";

@Module({
    imports: [PostgresModule, UsersModule],
    controllers: [FollowingsController],
    providers: [FollowingsService],
})
export class FollowingsModule {}
