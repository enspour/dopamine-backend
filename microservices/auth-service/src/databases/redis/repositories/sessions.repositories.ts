import { Inject, Injectable } from "@nestjs/common";
import { RedisClientType } from "redis";

import constants from "@constants";

const { REDIS } = constants.injections;

export interface Session {
    id: string;
    userAgent: string;
    expiredAt: number;
    createdAt: number;
}

@Injectable()
export class SessionsRepository {
    constructor(@Inject(REDIS) private redis: RedisClientType) {}

    async findAll(userId: number): Promise<Session[]> {
        const sessions = await this.redis.hGetAll(`sessions:${userId}`);

        return Object.entries(sessions).map(
            ([_, value]) => JSON.parse(value) as Session,
        );
    }

    async findOne(userId: number, sessionId: string): Promise<Session> {
        const info = await this.redis.hGet(`sessions:${userId}`, sessionId);

        return JSON.parse(info) as Session;
    }

    async save(userId: number, session: Session) {
        return await this.redis.hSet(
            `sessions:${userId}`,
            session.id,
            JSON.stringify(session),
        );
    }

    async remove(userId: number, sessionId: string) {
        return await this.redis.hDel(`sessions:${userId}`, sessionId);
    }
}
