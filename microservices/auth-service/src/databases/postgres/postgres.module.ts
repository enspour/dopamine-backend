import { Module } from "@nestjs/common";

import { PostgresProvider } from "./postgres.provider";

import { UsersEmailsRepository } from "./repositories/users-emails.repository";
import { UsersSecurityRepository } from "./repositories/users-security.repository";
import { UsersRepository } from "./repositories/users.repository";

@Module({
    imports: [],
    controllers: [],
    providers: [
        PostgresProvider,
        UsersRepository,
        UsersSecurityRepository,
        UsersEmailsRepository,
    ],
    exports: [UsersRepository, UsersSecurityRepository, UsersEmailsRepository],
})
export class PostgresModule {}
