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
    @Get(":link")
    async downloadByLink(@Param("link", ParseObjectIdPipe) link: string) {
        const result = await this.linksService.getOne(link);

        if (!result) {
            throw new NotFoundException("Link not found");
        }

        const { file } = result;

        const { _id, bucket } = file;

        const stream = await this.filesService.downloadFile(`${bucket}`, _id);
        return new StreamableFile(stream);
    }

    @UseGuards(JwtAccessAuthGuard)
    @Post(":id")
    async createLink(
        @Param("id", ParseObjectIdPipe) id: string,
        @Req() req: Request,
    ) {
        const { user } = req.user as AccessTokenPayload;

        const file = await this.filesService.getFileInfo(id);

        if (!file) {
            throw new NotFoundException("File not found");
        }

        if (file.owner_id !== user.id) {
            throw new ForbiddenException("File not available");
        }

        const link = await this.linksService.createOne(file._id);

        return {
            statusCode: 201,
            data: {
                link,
            },
        };
    }
}
