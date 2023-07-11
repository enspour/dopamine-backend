import { Module } from "@nestjs/common";

import { MongodbModule } from "@mongodb/mongodb.module";

import { UsersService } from "./users.service";

@Module({
    imports: [MongodbModule],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
