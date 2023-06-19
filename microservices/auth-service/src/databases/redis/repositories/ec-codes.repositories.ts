import { Inject, Injectable } from "@nestjs/common";
import { RedisClientType } from "redis";

import constants from "@constants";

import configs from "@configs";

const { REDIS } = constants.injections;

const { expiration } = configs.ec.codeOptions;

@Injectable()
export class ECCodesRepository {
    constructor(@Inject(REDIS) private redis: RedisClientType) {}

    async get(userId: number, code: string) {
        const emailId = await this.redis.get(`EC:${userId}:${code}`);
        return Number(emailId);
    }

    async save(userId: number, code: string, emailId: number) {
        return await this.redis.set(`EC:${userId}:${code}`, emailId, {
            EX: expiration,
        });
    }

    async remove(userId: number, code: string) {
        return await this.redis.del(`EC:${userId}:${code}`);
    }
}
