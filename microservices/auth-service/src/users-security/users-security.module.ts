import { Module } from "@nestjs/common";

import { PostgresModule } from "src/databases/postgres/postgres.module";

import { UsersSecurityController } from "./users-security.controller";
import { UsersSecurityService } from "./users-security.service";

@Module({
    imports: [PostgresModule],
    controllers: [UsersSecurityController],
    providers: [UsersSecurityService],
})
export class UsersSecurityModule {}
