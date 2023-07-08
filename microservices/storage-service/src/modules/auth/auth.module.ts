import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { JwtAccessStrategy } from "./strategies/jwt-access.strategy";

@Module({
    imports: [JwtModule.register({})],
    controllers: [],
    providers: [JwtAccessStrategy],
})
export class AuthModule {}
