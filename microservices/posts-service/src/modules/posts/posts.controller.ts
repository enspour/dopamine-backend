import {
    Body,
    Controller,
    Delete,
    ForbiddenException,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    Req,
    UseGuards,
} from "@nestjs/common";
import { Request } from "express";
import { Types } from "mongoose";

import { PostsService } from "./posts.service";

import { JwtAccessAuthGuard } from "@auth-guards/jwt-access.guard";
import { AccessTokenPayload } from "@auth-strategies/jwt-access.strategy";

import { ParseNumberArrayPipe, ParseObjectIdPipe } from "@pipes";

import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostFilesDto } from "./dto/update-post-files.dto";
import { UpdatePostTextDto } from "./dto/update-post-text.dto";

@Controller("posts")
export class PostsController {
    constructor(private postsService: PostsService) {}

    @UseGuards(JwtAccessAuthGuard)
    @Get("by-user-ids")
    async getManyByUserIds(
        @Query("ids", ParseNumberArrayPipe) ids: number[],
        @Query("from", ParseIntPipe) from: number,
        @Query("to", ParseIntPipe) to: number,
    ) {
        const posts = await this.postsService.findManyByUserIds(ids, from, to);

        return {
            statusCode: 200,
            data: {
                posts,
            },
        };
    }

    @UseGuards(JwtAccessAuthGuard)
    @Get(":id")
    async getOne(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
        const post = await this.postsService.findOne(id);

        if (!post) {
            throw new NotFoundException("Post is not found");
        }

        return {
            statusCode: 200,
            data: {
                post,
            },
        };
    }

    @UseGuards(JwtAccessAuthGuard)
    @Post()
    async create(@Body() data: CreatePostDto, @Req() req: Request) {
        const { user } = req.user as AccessTokenPayload;

        const { text, files } = data;

        const post = await this.postsService.create(text, files, user.id);

        return {
            statusCode: 201,
            data: {
                post,
            },
        };
    }

    @UseGuards(JwtAccessAuthGuard)
    @Delete(":id")
    async remove(
        @Param("id", ParseObjectIdPipe) id: Types.ObjectId,
        @Req() req: Request,
    ) {
        const { user } = req.user as AccessTokenPayload;

        const post = await this.postsService.findOne(id);

        if (!post) {
            throw new NotFoundException("Post is not found");
        }

        if (post.owner.id !== user.id) {
            throw new ForbiddenException("Don't access to post");
        }

        await this.postsService.remove(id);

        return {
            statusCode: 200,
        };
    }

    @UseGuards(JwtAccessAuthGuard)
    @Put("text")
    async updateText(@Body() data: UpdatePostTextDto, @Req() req: Request) {
        const { user } = req.user as AccessTokenPayload;

        const { id, text } = data;

        const post = await this.postsService.findOne(id);

        if (!post) {
            throw new NotFoundException("Post is not found");
        }

        if (post.owner.id !== user.id) {
            throw new ForbiddenException("Don't access to post");
        }

        await this.postsService.updateText(id, text);

        return {
            statusCode: 200,
        };
    }

    @UseGuards(JwtAccessAuthGuard)
    @Put("files")
    async updateFiles(@Body() data: UpdatePostFilesDto, @Req() req: Request) {
        const { user } = req.user as AccessTokenPayload;

        const { id, files } = data;

        const post = await this.postsService.findOne(id);

        if (!post) {
            throw new NotFoundException("Post is not found");
        }

        if (post.owner.id !== user.id) {
            throw new ForbiddenException("Don't access to post");
        }

        await this.postsService.updateFiles(id, files, user.id);

        return {
            statusCode: 200,
        };
    }

    @UseGuards(JwtAccessAuthGuard)
    @Post("like/:id")
    @HttpCode(200)
    async like(
        @Param("id", ParseObjectIdPipe) id: Types.ObjectId,
        @Req() req: Request,
    ) {
        const { user } = req.user as AccessTokenPayload;

        const post = await this.postsService.findOne(id);

        if (!post) {
            throw new NotFoundException("Post is not found");
        }

        await this.postsService.like(id, user.id);

        return {
            statusCode: 200,
        };
    }

    @UseGuards(JwtAccessAuthGuard)
    @Post("unlike/:id")
    @HttpCode(200)
    async unlike(
        @Param("id", ParseObjectIdPipe) id: Types.ObjectId,
        @Req() req: Request,
    ) {
        const { user } = req.user as AccessTokenPayload;

        const post = await this.postsService.findOne(id);

        if (!post) {
            throw new NotFoundException("Post is not found");
        }

        await this.postsService.unlike(id, user.id);

        return {
            statusCode: 200,
        };
    }
}
