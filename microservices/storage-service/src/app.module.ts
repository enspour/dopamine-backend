import { Module } from "@nestjs/common";

import { AuthModule } from "@auth/auth.module";
import { FilesModule } from "@files/files.module";

@Module({
    imports: [AuthModule, FilesModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
