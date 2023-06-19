import { Injectable } from "@nestjs/common";
import { Response } from "express";
import { nanoid } from "nanoid";

import { AccessTokenService } from "./tokens/access-token.service";
import { RefreshTokenService } from "./tokens/refresh-token.service";

import { User } from "@interfaces";

export interface JwtTokens {
    access: string;
    refresh: string;
}

@Injectable()
export class JwtService {
    constructor(
        private accessTokenService: AccessTokenService,
        private refreshTokenService: RefreshTokenService,
    ) {}

    async issue(
        user: Omit<User, "settings" | "emails" | "password">,
    ): Promise<JwtTokens> {
        const { id, nickname, avatar } = user;

        const sessionId = nanoid();

        const refresh = await this.refreshTokenService.issue({
            sessionId,
            userId: id,
        });

        const access = await this.accessTokenService.issue({
            sessionId,
            user: {
                id,
                nickname,
                avatar,
            },
        });

        return {
            access,
            refresh,
        };
    }

    save(tokens: JwtTokens, res: Response) {
        this.refreshTokenService.save(tokens.refresh, res);
        this.accessTokenService.save(tokens.access, res);
    }

    clear(res: Response) {
        this.refreshTokenService.clear(res);
        this.accessTokenService.clear(res);
    }
}
