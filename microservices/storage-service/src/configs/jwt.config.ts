import { readFileSync } from "node:fs";

export default {
    accessToken: {
        publicKey:
            process.env.JWT_ACCESS_TOKEN_PUBLIC_KEY ||
            readFileSync(
                __dirname + "/../../keys/access-token/jwtRS256.key.pub",
            ),
    },
};
