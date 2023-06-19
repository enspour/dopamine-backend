import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";

import constants from "@constants";

import configs from "@configs";

const { environment } = configs.server;
const { publicKey, privateKey, expiresIn } = configs.jwt.refreshToken;

const { REFRESH_COOKIE_NAME } = constants.jwt;

export interface RefreshTokenPayload {
    sessionId: string;
    userId: number;
}

export interface RefreshTokenExtendedPayload extends RefreshTokenPayload {
    iat: number;
    exp: number;
}

@Injectable()
export class RefreshTokenService {
    constructor(private jwtService: JwtService) {}

    async issue(payload: RefreshTokenPayload) {
        return await this.jwtService.signAsync(payload, {
            privateKey,
            expiresIn,
            algorithm: "RS256",
        });
    }

    verify(token: string) {
        try {
            return this.jwtService.verify(token, {
                publicKey,
            }) as RefreshTokenExtendedPayload;
        } catch {
            return null;
        }
    }

    decode(token: string) {
        return this.jwtService.decode(token) as RefreshTokenExtendedPayload;
    }

    save(token: string, res: Response) {
        res.cookie(REFRESH_COOKIE_NAME, token, {
            httpOnly: true,
            secure: environment === "production",
            path: "/api/v1/sessions/refresh",
            sameSite: "strict",
        });
    }

    clear(res: Response) {
        res.clearCookie(REFRESH_COOKIE_NAME, {
            path: "/api/v1/sessions/refresh",
        });
    }
}
