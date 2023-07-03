import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Strategy } from "passport-jwt";

import { RefreshTokenPayload } from "@jwt/tokens/refresh-token.service";

import constants from "@constants";

import configs from "@configs";

const { publicKey } = configs.jwt.refreshToken;

const { JWT_REFRESH } = constants.strategies;
const { REFRESH_COOKIE_NAME } = constants.jwt;

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
    Strategy,
    JWT_REFRESH,
) {
    constructor() {
        super({
            jwtFromRequest: (req: Request) => {
                if (req && req.cookies) {
                    return req.cookies[REFRESH_COOKIE_NAME];
                }

                return null;
            },
            secretOrKey: publicKey,
        });
    }

    async validate(payload: RefreshTokenPayload) {
        return payload;
    }
}
