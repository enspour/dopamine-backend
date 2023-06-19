import { readFileSync } from "node:fs";

export default {
    accessToken: {
        publicKey:
            process.env.JWT_ACCESS_TOKEN_PUBLIC_KEY ||
            readFileSync(
                __dirname + "/../../keys/access-token/jwtRS256.key.pub",
            ),
        privateKey:
            process.env.JWT_ACCESS_TOKEN_PRIVATE_KEY ||
            readFileSync(__dirname + "/../../keys/access-token/jwtRS256.key"),
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION || "15m",
    },
    refreshToken: {
        publicKey:
            process.env.JWT_REFRESH_TOKEN_PUBLIC_KEY ||
            readFileSync(
                __dirname + "/../../keys/refresh-token/jwtRS256.key.pub",
            ),
        privateKey:
            process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY ||
            readFileSync(__dirname + "/../../keys/refresh-token/jwtRS256.key"),
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION || "30d",
    },
};
