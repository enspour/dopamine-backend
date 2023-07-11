import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
    UseGuards,
} from "@nestjs/common";

import { FollowersService } from "./followers.service";

import { JwtAccessAuthGuard } from "@auth-guards/jwt-access.guard";

@Controller("followers")
export class FollowersController {
    constructor(private followingsService: FollowersService) {}

    @UseGuards(JwtAccessAuthGuard)
    @Get(":id")
    async getAll(@Param("id", ParseIntPipe) id: number) {
        const followers = await this.followingsService.findAll(id);

        return {
            statusCode: 200,
            data: {
                followers,
            },
        };
    }
}
