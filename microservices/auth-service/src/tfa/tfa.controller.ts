import {
    BadRequestException,
    Body,
    Controller,
    HttpCode,
    Post,
    Req,
    Res,
    UseGuards,
} from "@nestjs/common";
import { Request, Response } from "express";

import { SessionsService } from "@sessions/sessions.service";
import { TFAService } from "./tfa.service";

import { LocalAuthGuard } from "@auth-guards/local.guard";

import { ParseCodePipe } from "@pipes";

import { User } from "@interfaces";

@Controller("TFA")
export class TFAController {
    constructor(
        private tfaService: TFAService,
        private sessionsService: SessionsService,
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post("email/confirm")
    @HttpCode(200)
    async confirmByEmail(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
        @Body("code", ParseCodePipe) code: string,
    ) {
        const user = req.user as Omit<User, "password">;

        const isConfirm = await this.tfaService.confirm(user.id, code);

        if (!isConfirm) {
            throw new BadRequestException("Invalid code");
        }

        const sessionInfo = {
            user_agent: req.headers["user-agent"],
        };

        await this.sessionsService.login(user, sessionInfo, res);

        return {
            statusCode: 200,
        };
    }

    @UseGuards(LocalAuthGuard)
    @Post("email/resend")
    @HttpCode(200)
    async resendEmail(@Req() req: Request) {
        const user = req.user as Omit<User, "password">;

        await this.tfaService.sendConfirmationEmail(user.id, user.emails);

        return {
            statusCode: 200,
        };
    }
}
