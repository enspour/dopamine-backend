import {
    Body,
    Controller,
    HttpCode,
    ParseBoolPipe,
    Put,
    Req,
    UseGuards,
} from "@nestjs/common";
import { Request } from "express";

import { AccessTokenPayload } from "@jwt/tokens/access-token.service";

import { UsersSecurityService } from "./users-security.service";

import { JwtAccessAuthGuard } from "@auth-guards/jwt-access.guard";

@Controller("users/security")
export class UsersSecurityController {
    constructor(private usersSecurityService: UsersSecurityService) {}

    @UseGuards(JwtAccessAuthGuard)
    @Put("TFA-by-email")
    @HttpCode(200)
    async updateTFAByEmail(
        @Body("value", ParseBoolPipe) value: boolean,
        @Req() req: Request,
    ) {
        const { user } = req.user as AccessTokenPayload;

        await this.usersSecurityService.updateTFAByEmail(user.id, value);

        return {
            statusCode: 200,
        };
    }
}
