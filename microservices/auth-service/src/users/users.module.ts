import { Module } from "@nestjs/common";

import { PostgresModule } from "src/databases/postgres/postgres.module";

import { UsersService } from "./users.service";

@Module({
    imports: [PostgresModule],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
