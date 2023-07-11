import {
    Controller,
    ForbiddenException,
    Get,
    NotFoundException,
    Param,
    Post,
    Req,
    StreamableFile,
    UseGuards,
} from "@nestjs/common";
import { Request } from "express";
import { Types } from "mongoose";

import { FilesService } from "@files/files.service";
import { LinksService } from "./links.service";

import { JwtAccessAuthGuard } from "@auth-guards/jwt-access.guard";
import { AccessTokenPayload } from "@auth-strategies/jwt-access.strategy";

import { ParseObjectIdPipe } from "@pipes";

@Controller("files/links")
export class LinksController {
    constructor(
        private linksService: LinksService,
        private filesService: FilesService,
    ) {}

    @UseGuards(JwtAccessAuthGuard)
    @Get(":id")
    async downloadByLink(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
        const link = await this.linksService.getOne(id);

        if (!link) {
            throw new NotFoundException("Link not found");
        }

        const { file } = link;

        const stream = await this.filesService.download(
            file.id,
            file.bucket.name,
        );

        return new StreamableFile(stream);
    }

    @UseGuards(JwtAccessAuthGuard)
    @Post(":id")
    async createLink(
        @Param("id", ParseObjectIdPipe) id: Types.ObjectId,
        @Req() req: Request,
    ) {
        const { user } = req.user as AccessTokenPayload;

        const file = await this.filesService.getOne(id);

        if (!file) {
            throw new NotFoundException("File not found");
        }

        if (file.ownerId !== user.id) {
            throw new ForbiddenException("File not available");
        }

        const link = await this.linksService.createOne(file.id);

        return {
            statusCode: 201,
            data: {
                link,
            },
        };
    }
}
