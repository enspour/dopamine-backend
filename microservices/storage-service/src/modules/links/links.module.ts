import { Module } from "@nestjs/common";

import { MongodbModule } from "@mongodb/mongodb.module";

import { LinksService } from "./links.service";

@Module({
    imports: [MongodbModule],
    providers: [LinksService],
    exports: [LinksService],
})
export class LinksModule {}
