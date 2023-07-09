import { Module } from "@nestjs/common";

import { MinioProvider } from "./minio.provider";
import { MinioService } from "./minio.service";

@Module({
    providers: [MinioProvider, MinioService],
    exports: [MinioService],
})
export class MinioModule {}
