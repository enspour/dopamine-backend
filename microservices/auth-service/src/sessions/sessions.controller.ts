import {
    BadRequestException,
    Controller,
    Delete,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    Post,
    Req,
    Res,
    UseGuards,
} from "@nestjs/common";
import { Request, Response } from "express";

import { AccessTokenPayload } from "@jwt/tokens/access-token.service";
import { RefreshTokenPayload } from "@jwt/tokens/refresh-token.service";
import { UsersService } from "@users/users.service";
import { SessionsService } from "./sessions.service";

import { JwtAccessAuthGuard } from "@auth-guards/jwt-access.guard";
import { JwtRefreshAuthGuard } from "@auth-guards/jwt-refresh.guard";

import { ValidateStringPipe } from "@pipes";

@Controller("sessions")
export class SessionsController {
    constructor(
        private usersService: UsersService,
        private sessionsService: SessionsService,
    ) {}

    @UseGuards(JwtAccessAuthGuard)
    @Get()
    @HttpCode(200)
    async getAll(@Req() req: Request) {
        const { user } = req.user as AccessTokenPayload;

        const sessions = await this.sessionsService.getAll(user.id);

        return {
            statusCode: 200,
            data: {
                sessions,
            },
        };
    }

    @UseGuards(JwtRefreshAuthGuard)
    @Post("refresh")
    @HttpCode(200)
    async refresh(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        const { sessionId, userId } = req.user as RefreshTokenPayload;

        const session = await this.sessionsService.get(userId, sessionId);

        if (!session) {
            throw new BadRequestException();
        }

        await this.sessionsService.logout(userId, sessionId, res);

        const user = await this.usersService.findOneById(userId);

        const data = {
            user_agent: req.headers["user-agent"],
        };

        await this.sessionsService.login(user, data, res);

        return {
            statusCode: 200,
        };
    }

    @UseGuards(JwtAccessAuthGuard)
    @Delete(":id")
    @HttpCode(200)
    async remove(
        @Param("id", new ValidateStringPipe({ minLength: 21 })) id: string,
        @Req() req: Request,
    ) {
        const { user } = req.user as AccessTokenPayload;

        const result = await this.sessionsService.remove(user.id, id);

        if (!result) {
            throw new NotFoundException("Session not found");
        }

        return {
            statusCode: 200,
        };
    }
}
