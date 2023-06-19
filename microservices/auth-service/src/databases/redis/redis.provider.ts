import { createClient } from "redis";

import constants from "@constants";

import configs from "@configs";

const { username, password, host, port } = configs.redis;

const { REDIS } = constants.injections;

export const RedisProvider = {
    provide: REDIS,
    useFactory: async () => {
        const client = createClient({
            username,
            password,
            socket: {
                host,
                port,
            },
        });

        client.connect();

        return client;
    },
};
