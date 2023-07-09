import { Module } from "@nestjs/common";

import { MinioModule } from "@minio/minio.module";
import { MongodbModule } from "@mongodb/mongodb.module";

import { FilesController } from "./files.controller";
import { FilesService } from "./files.service";

@Module({
    imports: [MongodbModule, MinioModule],
    controllers: [FilesController],
    providers: [FilesService],
    exports: [FilesService],
})
export class FilesModule {}
