import {
    BadRequestException,
    Controller,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Req,
    UseGuards,
} from "@nestjs/common";
import { Request } from "express";

import { UsersService } from "@users/users.service";
import { FollowingsService } from "./followings.service";

import { JwtAccessAuthGuard } from "@guards/jwt-access.guard";

import { AccessTokenPayload } from "@strategies/jwt-access.strategy";

@Controller("followings")
export class FollowingsController {
    constructor(
        private followingsService: FollowingsService,
        private usersService: UsersService,
    ) {}

    @UseGuards(JwtAccessAuthGuard)
    @Get()
    async getAll(@Req() req: Request) {
        const { user } = req.user as AccessTokenPayload;

        const followings = await this.followingsService.findAll(user.id);

        return {
            statusCode: 200,
            data: {
                followings,
            },
        };
    }

    @UseGuards(JwtAccessAuthGuard)
    @Post("follow/:id")
    @HttpCode(200)
    async follow(@Param("id", ParseIntPipe) id: number, @Req() req: Request) {
        const { user: follower } = req.user as AccessTokenPayload;

        if (id === follower.id) {
            throw new BadRequestException("Validation error");
        }

        const user = await this.usersService.findOne(id);

        if (!user) {
            throw new NotFoundException("User not found");
        }

        const following = await this.followingsService.follow(
            user.id,
            follower.id,
        );

        return {
            statusCode: 200,
            data: {
                following,
            },
        };
    }

    @UseGuards(JwtAccessAuthGuard)
    @Post("unfollow/:id")
    @HttpCode(200)
    async unfollow(@Param("id", ParseIntPipe) id: number, @Req() req: Request) {
        const { user: follower } = req.user as AccessTokenPayload;

        if (id === follower.id) {
            throw new BadRequestException("Validation error");
        }

        const user = await this.usersService.findOne(id);

        if (!user) {
            throw new NotFoundException("User not found");
        }

        const count = await this.followingsService.unfollow(
            user.id,
            follower.id,
        );

        return {
            statusCode: 200,
            data: {
                count,
            },
        };
    }
}
