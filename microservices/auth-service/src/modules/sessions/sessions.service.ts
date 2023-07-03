import { Injectable } from "@nestjs/common";
import { Response } from "express";

import { JwtService } from "@jwt/jwt.service";
import { AccessTokenService } from "@jwt/tokens/access-token.service";
import { RefreshTokenService } from "@jwt/tokens/refresh-token.service";

import {
    Session,
    SessionsRepository,
} from "@redis/repositories/sessions.repositories";

import { User } from "@interfaces";

import constants from "@constants";

const { ACCESS_COOKIE_NAME } = constants.jwt;

@Injectable()
export class SessionsService {
    constructor(
        private sessionsRepository: SessionsRepository,
        private jwtService: JwtService,
        private accessTokenService: AccessTokenService,
        private refreshTokenService: RefreshTokenService,
    ) {}

    async getAll(userId: number) {
        return await this.sessionsRepository.findAll(userId);
    }

    async get(userId: number, sessionId: string) {
        return await this.sessionsRepository.findOne(userId, sessionId);
    }

    async remove(userId: number, sessionId: string) {
        return await this.sessionsRepository.remove(userId, sessionId);
    }

    async login(
        user: Pick<User, "id" | "nickname" | "avatar">,
        data: Omit<Session, "id" | "expired_at" | "created_at">,
        res: Response,
    ) {
        const tokens = await this.jwtService.issue(user);

        const payload = this.refreshTokenService.decode(tokens.refresh);

        const session = {
            ...data,
            id: payload.sessionId,
            expired_at: payload.exp,
            created_at: payload.iat,
        };

        await this.sessionsRepository.save(payload.userId, session);

        this.jwtService.save(tokens, res);
    }

    async logout(userId: number, sessionId: string, res: Response) {
        await this.sessionsRepository.remove(userId, sessionId);

        this.jwtService.clear(res);
    }

    async tryLogout(cookies: any, res: Response) {
        const accessToken = cookies[ACCESS_COOKIE_NAME];

        if (accessToken) {
            const payload = this.accessTokenService.verify(accessToken, {
                ignoreExpiration: true,
            });

            if (payload) {
                await this.logout(payload.user.id, payload.sessionId, res);
            }
        }
    }
}
