import { Injectable } from "@nestjs/common";

import { BucketsService } from "@buckets/buckets.service";

@Injectable()
export class AuthQueueService {
    constructor(private bucketService: BucketsService) {}

    async createBucket(bucket: string) {
        await this.bucketService.createOne(bucket, []);
    }
}
