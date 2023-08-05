import { Module } from "@nestjs/common";

import { AuthModule } from "@auth/auth.module";
import { FilesModule } from "@files/files.module";
import { HealthCheckerModule } from "@health-checker/health-checker.module";
import { LinksModule } from "@links/links.module";

import { AuthQueueModule } from "@queues/auth-queue/auth-queue.module";
import { StorageQueueModule } from "@queues/storage-queue/storage-queue.module";

@Module({
    imports: [
        AuthModule,
        FilesModule,
        HealthCheckerModule,
        LinksModule,

        AuthQueueModule,
        StorageQueueModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
