import { Injectable } from "@nestjs/common";

import { StorageQueueService } from "@storage-queue/storage-queue.service";

@Injectable()
export class StorageService {
    constructor(private storageQueueService: StorageQueueService) {}

    async makePublicImages(images: string[], userId: number) {
        const promises = images.map((image) =>
            this.storageQueueService.makeFilePublic(image, userId),
        );

        return await Promise.allSettled(promises);
    }
}
