import {
    BadRequestException,
    Body,
    Controller,
    HttpCode,
    Post,
    Req,
    Res,
    UseFilters,
    UseGuards,
} from "@nestjs/common";
import { Request, Response } from "express";

import { AuthService } from "@auth/auth.service";
import { SessionsService } from "@sessions/sessions.service";
import { TFAService } from "@tfa/tfa.service";
import { UsersEmailsService } from "@users-emails/users-emails.service";

import { AccessTokenPayload } from "@jwt/tokens/access-token.service";

import { JwtAccessAuthGuard } from "@auth-guards/jwt-access.guard";
import { LocalNotVerifiedAuthGuard } from "@auth-guards/local-not-verified.guard";
import { LocalAuthGuard } from "@auth-guards/local.guard";

import { DuplicateFilter } from "@filters";
import { ParseCodePipe } from "@pipes";

import { User } from "@interfaces";

import { SignupDto } from "./dto/signup.dto";

@Controller("auth")
export class AuthController {
    constructor(
        private authService: AuthService,
        private tfaService: TFAService,
        private sessionsService: SessionsService,
        private usersEmailsService: UsersEmailsService,
    ) {}

    @Post("signup")
    @UseFilters(new DuplicateFilter())
    async signup(
        @Body() body: SignupDto,
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        await this.sessionsService.tryLogout(req.cookies, res);

        const { nickname, email, password } = body;

        const user = await this.authService.createUser(
            nickname,
            email,
            password,
        );

        const { id, emails } = user;

        await this.usersEmailsService.sendConfirmationEmail(id, emails[0]);

        return {
            statusCode: 201,
        };
    }

    @UseGuards(LocalNotVerifiedAuthGuard)
    @Post("signup/email-confirmation")
    @HttpCode(200)
    async signupConfirmEmail(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
        @Body("code", ParseCodePipe) code: string,
    ) {
        const user = req.user as Omit<User, "password">;

        const email = user.emails[0];

        const isConfirm = await this.usersEmailsService.confirmEmail(
            user.id,
            email.id,
            code,
        );

        if (!isConfirm) {
            throw new BadRequestException("Invalid Code");
        }

        const data = {
            userAgent: req.headers["user-agent"],
        };

        await this.sessionsService.login(user, data, res);

        return {
            statusCode: 200,
        };
    }

    @UseGuards(LocalNotVerifiedAuthGuard)
    @Post("signup/resend-email-confirmation")
    @HttpCode(200)
    async signupResendEmail(@Req() req: Request) {
        const user = req.user as Omit<User, "password">;

        const { id: userId, emails } = user;

        await this.usersEmailsService.sendConfirmationEmail(userId, emails[0]);

        return {
            statusCode: 200,
        };
    }

    @UseGuards(LocalAuthGuard)
    @Post("login")
    @HttpCode(200)
    async login(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        await this.sessionsService.tryLogout(req.cookies, res);

        const user = req.user as Omit<User, "password">;

        if (user.security.TFAByEmail) {
            await this.tfaService.sendConfirmationEmail(user.id, user.emails);
        } else {
            const data = {
                userAgent: req.headers["user-agent"],
            };

            await this.sessionsService.login(user, data, res);
        }

        return {
            statusCode: 200,
            data: {
                security: user.security,
            },
        };
    }

    @UseGuards(JwtAccessAuthGuard)
    @Post("logout")
    @HttpCode(200)
    async logout(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        const { sessionId, user } = req.user as AccessTokenPayload;

        await this.sessionsService.logout(user.id, sessionId, res);

        return {
            statusCode: 200,
        };
    }
}
