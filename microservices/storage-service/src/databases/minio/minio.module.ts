import { Inject, Module } from "@nestjs/common";
import * as minio from "minio";

import { MinioProvider } from "./minio.provider";
import { MinioService } from "./minio.service";

import constants from "@constants";

import configs from "@configs";

const { MINIO } = constants.injections;

const { bucket } = configs.minio;

@Module({
    providers: [MinioProvider, MinioService],
    exports: [MinioService],
})
export class MinioModule {
    constructor(@Inject(MINIO) private client: minio.Client) {}

    async onModuleInit() {
        const isExists = await this.client.bucketExists(bucket);
        if (!isExists) {
            await this.client.makeBucket(bucket);
        }
    }
}
