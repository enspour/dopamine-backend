import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Req,
    UseFilters,
    UseGuards,
} from "@nestjs/common";
import { Request } from "express";

import { UsersService } from "@users/users.service";
import { UsersEmailsService } from "./users-emails.service";

import { JwtAccessAuthGuard } from "@auth-guards/jwt-access.guard";

import { AccessTokenPayload } from "@jwt/tokens/access-token.service";

import { ParseCodePipe, ParseEmailPipe } from "@pipes";

import { DuplicateFilter } from "@filters";

@Controller("users/emails")
export class UsersEmailsController {
    constructor(
        private usersService: UsersService,
        private usersEmailsService: UsersEmailsService,
    ) {}

    @UseGuards(JwtAccessAuthGuard)
    @Get("resend/:id")
    async resend(
        @Param("id", ParseIntPipe) emailId: number,
        @Req() req: Request,
    ) {
        const { user } = req.user as AccessTokenPayload;

        const found = await this.usersService.findOneByIdAll(user.id);

        const email = found.emails.find((email) => email.id === emailId);

        if (email) {
            await this.usersEmailsService.sendConfirmationEmail(user.id, email);

            return {
                statusCode: 200,
            };
        }

        throw new NotFoundException("Email not found");
    }

    @UseGuards(JwtAccessAuthGuard)
    @Post("confirm")
    @HttpCode(200)
    async confirm(
        @Body("code", ParseCodePipe) code: string,
        @Body("emailId", ParseIntPipe) emailId: number,
        @Req() req: Request,
    ) {
        const { user } = req.user as AccessTokenPayload;

        const isConfirm = await this.usersEmailsService.confirmEmail(
            user.id,
            emailId,
            code,
        );

        if (!isConfirm) {
            throw new BadRequestException("Invalid Code");
        }

        return {
            statusCode: 200,
        };
    }

    @UseGuards(JwtAccessAuthGuard)
    @Get()
    async getAll(@Req() req: Request) {
        const { user } = req.user as AccessTokenPayload;

        const emails = await this.usersEmailsService.findAll(user.id);

        return {
            statusCode: 200,
            data: {
                emails,
            },
        };
    }

    @UseFilters(DuplicateFilter)
    @UseGuards(JwtAccessAuthGuard)
    @Post()
    async create(
        @Body("email", ParseEmailPipe) email: string,
        @Req() req: Request,
    ) {
        const { user } = req.user as AccessTokenPayload;

        const result = await this.usersEmailsService.createOne(user.id, email);

        return {
            statusCode: 201,
            data: {
                email: result,
            },
        };
    }

    @UseGuards(JwtAccessAuthGuard)
    @Delete(":id")
    async remove(
        @Param("id", ParseIntPipe) emailId: number,
        @Req() req: Request,
    ) {
        const { user } = req.user as AccessTokenPayload;

        const emails = await this.usersEmailsService.findAll(user.id);

        const email = emails.find((email) => email.id === emailId);

        if (!email) {
            throw new NotFoundException("Email not found");
        }

        if (email.confirm && emails.filter((item) => item.confirm).length < 2) {
            throw new BadRequestException("Must be one confirmed email");
        }

        await this.usersEmailsService.removeOne(user.id, email.id);

        return {
            statusCode: 200,
        };
    }
}
