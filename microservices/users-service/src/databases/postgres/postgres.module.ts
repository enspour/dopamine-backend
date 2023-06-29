import { Module } from "@nestjs/common";

import { PostgresProvider } from "./postgres.provider";

import { FollowingsRepository } from "./repositories/followings.repository";
import { UsersRepository } from "./repositories/users.repository";

@Module({
    imports: [],
    controllers: [],
    providers: [PostgresProvider, UsersRepository, FollowingsRepository],
    exports: [UsersRepository, FollowingsRepository],
})
export class PostgresModule {}
