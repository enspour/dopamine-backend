import { Module } from "@nestjs/common";

import { RedisProvider } from "./redis.provider";

import { ECCodesRepository } from "./repositories/ec-codes.repositories";
import { SessionsRepository } from "./repositories/sessions.repositories";
import { TFACodesRepository } from "./repositories/tfa-codes.repository";

@Module({
    providers: [
        RedisProvider,
        SessionsRepository,
        ECCodesRepository,
        TFACodesRepository,
    ],
    exports: [SessionsRepository, ECCodesRepository, TFACodesRepository],
})
export class RedisModule {}
