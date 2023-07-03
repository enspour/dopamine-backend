import { Module } from "@nestjs/common";

import { JwtModule } from "@jwt/jwt.module";
import { RedisModule } from "@redis/redis.module";
import { UsersModule } from "@users/users.module";

import { SessionsController } from "./sessions.controller";
import { SessionsService } from "./sessions.service";

@Module({
    imports: [RedisModule, UsersModule, JwtModule],
    controllers: [SessionsController],
    providers: [SessionsService],
    exports: [SessionsService],
})
export class SessionsModule {}
