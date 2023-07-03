import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Put,
    Req,
    UseGuards,
} from "@nestjs/common";
import { Request } from "express";

import { UsersService } from "./users.service";

import { JwtAccessAuthGuard } from "@auth-guards/jwt-access.guard";

import avatarValidator from "./validators/avatar.validator";
import nameValidator from "./validators/name.validator";
import nicknameValidator from "./validators/nickname.validator";
import statusValidator from "./validators/status.validator";

import { AccessTokenPayload } from "@auth-strategies/jwt-access.strategy";

@Controller("users")
export class UsersController {
    constructor(private usersService: UsersService) {}

    @UseGuards(JwtAccessAuthGuard)
    @Get("me")
    async me(@Req() req: Request) {
        const { user } = req.user as AccessTokenPayload;
        const found = await this.usersService.findOne(user.id);

        return {
            statusCode: 200,
            data: {
                user: found,
            },
        };
    }

    @UseGuards(JwtAccessAuthGuard)
    @Get(":id")
    async getOne(@Param("id", ParseIntPipe) id: number) {
        const user = await this.usersService.findOne(id);

        if (!user) {
            throw new NotFoundException("User not found");
        }

        return {
            statusCode: 200,
            data: {
                user,
            },
        };
    }

    @UseGuards(JwtAccessAuthGuard)
    @Put("name")
    async updateName(
        @Body("name", nameValidator) name: string,
        @Req() req: Request,
    ) {
        const { user } = req.user as AccessTokenPayload;

        const count = await this.usersService.updateName(user.id, name);

        return {
            statusCode: 200,
            data: {
                count,
            },
        };
    }

    @UseGuards(JwtAccessAuthGuard)
    @Put("nickname")
    async updateNickname(
        @Body("nickname", nicknameValidator) nickname: string,
        @Req() req: Request,
    ) {
        const { user } = req.user as AccessTokenPayload;

        const count = await this.usersService.updateNickname(user.id, nickname);

        return {
            statusCode: 200,
            data: {
                count,
            },
        };
    }

    @UseGuards(JwtAccessAuthGuard)
    @Put("status")
    async updateStatus(
        @Body("status", statusValidator) status: string,
        @Req() req: Request,
    ) {
        const { user } = req.user as AccessTokenPayload;

        const count = await this.usersService.updateStatus(user.id, status);

        return {
            statusCode: 200,
            data: {
                count,
            },
        };
    }

    @UseGuards(JwtAccessAuthGuard)
    @Put("avatar")
    async updateAvatar(
        @Body("avatar", avatarValidator) avatar: string,
        @Req() req: Request,
    ) {
        const { user } = req.user as AccessTokenPayload;

        const count = await this.usersService.updateAvatar(user.id, avatar);

        return {
            statusCode: 200,
            data: {
                count,
            },
        };
    }
}
