import { Module } from "@nestjs/common";

import { MongodbModule } from "@mongodb/mongodb.module";

import { GroupsService } from "./groups.service";

@Module({
    imports: [MongodbModule],
    providers: [GroupsService],
    exports: [GroupsService],
})
export class GroupsModule {}
