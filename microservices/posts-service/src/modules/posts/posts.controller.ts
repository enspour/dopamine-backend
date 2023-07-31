import {
    Body,
    Controller,
    Delete,
    ForbiddenException,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    Post,
    Put,
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
import { UpdatePostImagesDto } from "./dto/update-post-images.dto";
import { UpdatePostTextDto } from "./dto/update-post-text.dto";

@Controller("posts")
export class PostsController {
    constructor(private postsService: PostsService) {}

    @UseGuards(JwtAccessAuthGuard)
    @Post()
    async create(@Body() data: CreatePostDto, @Req() req: Request) {
        const { user } = req.user as AccessTokenPayload;

        const { text, images } = data;

        const post = await this.postsService.create(text, images, user.id);

        return {
            statusCode: 201,
            data: {
                post,
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
    @Get("by-user-ids/:user_ids")
    async getManyByUserIds(
        @Param("user_ids", ParseNumberArrayPipe) userIds: number[],
    ) {
        const posts = await this.postsService.findManyByUserIds(userIds);

        if (!posts) {
            throw new NotFoundException("Posts is not found");
        }

        return {
            statusCode: 200,
            data: {
                posts,
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
    @Put("images")
    async updateImages(@Body() data: UpdatePostImagesDto, @Req() req: Request) {
        const { user } = req.user as AccessTokenPayload;

        const { id, images } = data;

        const post = await this.postsService.findOne(id);

        if (!post) {
            throw new NotFoundException("Post is not found");
        }

        if (post.owner.id !== user.id) {
            throw new ForbiddenException("Don't access to post");
        }

        await this.postsService.updateImages(id, images, user.id);

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
