import { Injectable } from "@nestjs/common";

import { StorageQueueService } from "@storage-queue/storage-queue.service";

@Injectable()
export class StorageService {
    constructor(private storageQueueService: StorageQueueService) {}

    async makeFilePublic(files: string[], userId: number) {
        const promises = files.map((file) =>
            this.storageQueueService.makeFilePublic(file, userId),
        );

        return await Promise.allSettled(promises);
    }
}
