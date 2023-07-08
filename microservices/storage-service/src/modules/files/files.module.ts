import { Module } from "@nestjs/common";

import { GroupsModule } from "@groups/groups.module";
import { LinksModule } from "@links/links.module";
import { MinioModule } from "@minio/minio.module";
import { MongodbModule } from "@mongodb/mongodb.module";

import { FilesController } from "./files.controller";
import { FilesService } from "./files.service";

@Module({
    imports: [MongodbModule, MinioModule, LinksModule, GroupsModule],
    controllers: [FilesController],
    providers: [FilesService],
    exports: [FilesService],
})
export class FilesModule {}
