import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { BucketEntity, BucketSchema } from "./schemas/bucket.schema";
import { FileEntity, FileSchema } from "./schemas/file.schema";
import { LinkEntity, LinkSchema } from "./schemas/link.schema";

import { BucketsRepository } from "./repositories/buckets.repository";
import { FilesRepository } from "./repositories/files.repository";
import { LinksRepository } from "./repositories/links.repository";

import configs from "@configs";

const { host, port, pass, user, db } = configs.mongodb;

@Module({
    imports: [
        MongooseModule.forRoot(
            `mongodb://${user}:${pass}@${host}:${port}/${db}?authSource=admin`,
        ),
        MongooseModule.forFeature([
            {
                name: FileEntity.name,
                schema: FileSchema,
            },
            {
                name: BucketEntity.name,
                schema: BucketSchema,
            },
            {
                name: LinkEntity.name,
                schema: LinkSchema,
            },
        ]),
    ],
    providers: [FilesRepository, BucketsRepository, LinksRepository],
    exports: [FilesRepository, BucketsRepository, LinksRepository],
})
export class MongodbModule {}
