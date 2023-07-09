import { Module } from "@nestjs/common";

import { FilesModule } from "@files/files.module";
import { MongodbModule } from "@mongodb/mongodb.module";

import { LinksController } from "./links.controller";
import { LinksService } from "./links.service";

@Module({
    imports: [MongodbModule, FilesModule],
    controllers: [LinksController],
    providers: [LinksService],
    exports: [LinksService],
})
export class LinksModule {}
