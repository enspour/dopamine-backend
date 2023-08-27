import { Injectable } from "@nestjs/common";

import { StorageQueueService } from "@storage-queue/storage-queue.service";

import { FileMetadata } from "@interfaces";

@Injectable()
export class StorageService {
    constructor(private storageQueueService: StorageQueueService) {}

    async makeFilePublic(files: FileMetadata[], userId: number) {
        const promises = files.map((file) =>
            this.storageQueueService.makeFilePublic(file.id, userId),
        );

        return await Promise.allSettled(promises);
    }
}
