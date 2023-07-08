import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Strategy } from "passport-jwt";

import constants from "@constants";

import configs from "@configs";

const { publicKey } = configs.jwt.accessToken;

const { JWT_ACCESS } = constants.strategies;
const { ACCESS_COOKIE_NAME } = constants.jwt;

export interface AccessTokenPayload {
    sessionId: string;
    user: {
        id: number;
        nickname: string;
        avatar: string;
    };
}

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, JWT_ACCESS) {
    constructor() {
        super({
            jwtFromRequest: (req: Request) => {
                if (req && req.cookies) {
                    return req.cookies[ACCESS_COOKIE_NAME];
                }

                return null;
            },
            secretOrKey: publicKey,
        });
    }

    async validate(payload: AccessTokenPayload) {
        return payload;
    }
}
