import {
    Controller,
    ForbiddenException,
    Get,
    NotFoundException,
    Param,
    Post,
    Req,
    StreamableFile,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { Request } from "express";
import { Types } from "mongoose";

import { FilesService } from "./files.service";

import { JwtAccessAuthGuard } from "@auth-guards/jwt-access.guard";
import { AccessTokenPayload } from "@auth-strategies/jwt-access.strategy";

import { ParseObjectIdPipe, UploadFilesPipe } from "@pipes";

import constants from "@constants";

const { MB } = constants.units;

@Controller("files")
export class FilesController {
    constructor(private filesService: FilesService) {}

    @UseGuards(JwtAccessAuthGuard)
    @UseInterceptors(AnyFilesInterceptor())
    @Post("upload")
    async upload(
        @UploadedFiles(
            new UploadFilesPipe({
                minCount: 1,
                maxCount: 1,
                file: { maxSize: 10 * MB },
            }),
        )
        files: Express.Multer.File[],
        @Req() req: Request,
    ) {
        const { user } = req.user as AccessTokenPayload;

        const file = await this.filesService.upload(files[0], user.id);

        return {
            statusCode: 200,
            data: {
                file,
            },
        };
    }

    @UseGuards(JwtAccessAuthGuard)
    @Get("download/:id")
    async downloadById(
        @Param("id", ParseObjectIdPipe) id: Types.ObjectId,
        @Req() req: Request,
    ) {
        const { user } = req.user as AccessTokenPayload;

        const file = await this.filesService.getOne(id);

        if (!file) {
            throw new NotFoundException("file not found");
        }

        const { bucket } = file;

        if (
            file.access === "public" ||
            file.ownerId === user.id ||
            bucket.users.includes(user.id)
        ) {
            const stream = await this.filesService.download(id, bucket.name);
            return new StreamableFile(stream);
        }

        throw new ForbiddenException("File not available");
    }
}
