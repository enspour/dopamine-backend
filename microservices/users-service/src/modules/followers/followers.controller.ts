import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";

import { FollowersService } from "./followers.service";

import { JwtAccessAuthGuard } from "@auth-guards/jwt-access.guard";

import { AccessTokenPayload } from "@auth/strategies/jwt-access.strategy";

@Controller("followers")
export class FollowersController {
    constructor(private followingsService: FollowersService) {}

    @UseGuards(JwtAccessAuthGuard)
    @Get()
    async getAll(@Req() req: Request) {
        const { user } = req.user as AccessTokenPayload;

        const followers = await this.followingsService.findAll(user.id);

        return {
            statusCode: 200,
            data: {
                followers,
            },
        };
    }
}
