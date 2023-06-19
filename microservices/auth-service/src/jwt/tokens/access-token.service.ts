import { Injectable } from "@nestjs/common";
import { JwtService, JwtVerifyOptions } from "@nestjs/jwt";
import { Response } from "express";

import constants from "@constants";

import configs from "@configs";

const { environment } = configs.server;
const { publicKey, privateKey, expiresIn } = configs.jwt.accessToken;

const { ACCESS_COOKIE_NAME } = constants.jwt;

export interface AccessTokenPayload {
    sessionId: string;
    user: {
        id: number;
        nickname: string;
        avatar: string;
    };
}

export interface AccessTokenExtendedPayload extends AccessTokenPayload {
    iat: number;
    exp: number;
}

@Injectable()
export class AccessTokenService {
    constructor(private jwtService: JwtService) {}

    async issue(payload: AccessTokenPayload) {
        return await this.jwtService.signAsync(payload, {
            privateKey,
            expiresIn,
            algorithm: "RS256",
        });
    }

    verify(token: string, options?: JwtVerifyOptions) {
        try {
            return this.jwtService.verify(token, {
                publicKey,
                ...options,
            }) as AccessTokenExtendedPayload;
        } catch {
            return null;
        }
    }

    decode(token: string) {
        return this.jwtService.decode(token) as AccessTokenExtendedPayload;
    }

    save(token: string, res: Response) {
        res.cookie(ACCESS_COOKIE_NAME, token, {
            httpOnly: true,
            secure: environment === "production",
            sameSite: "strict",
        });
    }

    clear(res: Response) {
        res.clearCookie(ACCESS_COOKIE_NAME);
    }
}
