import { Module } from "@nestjs/common";

import { MinioModule } from "@minio/minio.module";
import { MongodbModule } from "@mongodb/mongodb.module";

import { BucketsService } from "./buckets.service";

@Module({
    imports: [MongodbModule, MinioModule],
    providers: [BucketsService],
    exports: [BucketsService],
})
export class BucketsModule {}
