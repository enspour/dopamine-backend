import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { FileEntity, FileSchema } from "./schemas/file.schema";
import { GroupEntity, GroupSchema } from "./schemas/group.schema";
import { LinkEntity, LinkSchema } from "./schemas/link.schema";

import { FilesRepository } from "./repositories/files.repository";
import { GroupsRepository } from "./repositories/groups.repository";
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
                name: GroupEntity.name,
                schema: GroupSchema,
            },
            {
                name: LinkEntity.name,
                schema: LinkSchema,
            },
        ]),
    ],
    providers: [FilesRepository, GroupsRepository, LinksRepository],
    exports: [FilesRepository, GroupsRepository, LinksRepository],
})
export class MongodbModule {}
