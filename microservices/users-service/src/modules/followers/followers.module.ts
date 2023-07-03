import { Module } from "@nestjs/common";

import { PostgresModule } from "@postgres/postgres.module";

import { FollowersController } from "./followers.controller";
import { FollowersService } from "./followers.service";

@Module({
    imports: [PostgresModule],
    controllers: [FollowersController],
    providers: [FollowersService],
})
export class FollowersModule {}
