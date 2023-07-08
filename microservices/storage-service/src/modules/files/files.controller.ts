import {
    BadRequestException,
    Controller,
    ForbiddenException,
    Get,
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

import { GroupsService } from "@groups/groups.service";
import { LinksService } from "@links/links.service";
import { FilesService } from "./files.service";

import { JwtAccessAuthGuard } from "@auth-guards/jwt-access.guard";
import { AccessTokenPayload } from "@auth-strategies/jwt-access.strategy";

import { ParseObjectIdPipe, UploadFilesPipe, ValidateStringPipe } from "@pipes";

import constants from "@constants";

const { MB } = constants.units;

@Controller("files")
export class FilesController {
    constructor(
        private filesService: FilesService,
        private groupsService: GroupsService,
        private linksService: LinksService,
    ) {}

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

        const file = await this.filesService.uploadFile(files[0], user.id);

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
        @Param("id", ParseObjectIdPipe) id: string,
        @Req() req: Request,
    ) {
        const { user } = req.user as AccessTokenPayload;

        const file = await this.filesService.getFile(id);

        if (!file) {
            throw new BadRequestException("file not found");
        }

        if (file.owner_id === user.id || file.access === "public") {
            const stream = await this.filesService.downloadFile(file._id);
            return new StreamableFile(stream);
        }

        throw new ForbiddenException("File not available");
    }

    @UseGuards(JwtAccessAuthGuard)
    @Get("download-by-link/:link")
    async downloadByLink(
        @Param("link", new ValidateStringPipe({ minLength: 1 })) link: string,
    ) {
        const result = await this.linksService.getLink(link);

        if (!result) {
            throw new BadRequestException("Link not found");
        }

        const { file } = result;

        if (file.access === "links & groups") {
            const stream = await this.filesService.downloadFile(file._id);
            return new StreamableFile(stream);
        }

        throw new ForbiddenException("File not available");
    }

    @UseGuards(JwtAccessAuthGuard)
    @Get("download-by-group/:group")
    async downloadByGroup(
        @Param("group", new ValidateStringPipe({ minLength: 1 })) group: string,
        @Req() req: Request,
    ) {
        const { user } = req.user as AccessTokenPayload;

        const result = await this.groupsService.getGroup(group);

        if (!result) {
            throw new BadRequestException("Group not found");
        }

        const { file, users } = result;

        if (file.access === "links & groups" && users.includes(user.id)) {
            const stream = await this.filesService.downloadFile(file._id);
            return new StreamableFile(stream);
        }

        throw new ForbiddenException("File not available");
    }
}
