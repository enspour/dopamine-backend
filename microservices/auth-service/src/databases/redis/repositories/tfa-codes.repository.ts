import { Inject, Injectable } from "@nestjs/common";
import { RedisClientType } from "redis";

import constants from "@constants";

import configs from "@configs";

const { REDIS } = constants.injections;

const { expiration } = configs.tfa.codeOptions;

@Injectable()
export class TFACodesRepository {
    constructor(@Inject(REDIS) private redis: RedisClientType) {}

    async isExists(userId: number, code: string) {
        return await this.redis.exists(`TFA:${userId}:${code}`);
    }

    async save(userId: number, code: string) {
        return await this.redis.set(`TFA:${userId}:${code}`, "", {
            EX: expiration,
        });
    }

    async remove(userId: number, code: string) {
        return await this.redis.del(`TFA:${userId}:${code}`);
    }
}
