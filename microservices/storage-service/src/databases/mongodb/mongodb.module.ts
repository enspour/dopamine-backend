import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { BucketEntity, BucketSchema } from "./schemas/bucket.schema";
import {
    FileMetadataEntity,
    FileMetadataSchema,
} from "./schemas/file-metadata.schema";
import { LinkEntity, LinkSchema } from "./schemas/link.schema";

import { BucketsRepository } from "./repositories/buckets.repository";
import { FileMetadataRepository } from "./repositories/file-metadata.repository";
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
                name: FileMetadataEntity.name,
                schema: FileMetadataSchema,
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
    providers: [FileMetadataRepository, BucketsRepository, LinksRepository],
    exports: [FileMetadataRepository, BucketsRepository, LinksRepository],
})
export class MongodbModule {}
