import { Module } from "@nestjs/common";
import { JwtModule as JwtBaseModule } from "@nestjs/jwt";

import { JwtService } from "./jwt.service";
import { AccessTokenService } from "./tokens/access-token.service";
import { RefreshTokenService } from "./tokens/refresh-token.service";

@Module({
    imports: [JwtBaseModule.register({})],
    providers: [JwtService, AccessTokenService, RefreshTokenService],
    exports: [JwtService, AccessTokenService, RefreshTokenService],
})
export class JwtModule {}
