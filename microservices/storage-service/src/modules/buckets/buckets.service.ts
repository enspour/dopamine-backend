import { Injectable } from "@nestjs/common";

import { MinioService } from "@minio/minio.service";

import { BucketsRepository } from "@mongodb/repositories/buckets.repository";
import { BucketEntity } from "@mongodb/schemas/bucket.schema";

@Injectable()
export class BucketsService {
    constructor(
        private bucketsRepository: BucketsRepository,
        private minioService: MinioService,
    ) {}

    async getOne(id: string) {
        return await this.bucketsRepository.findOneById(id);
    }

    async createOne(id: string, users: number[]): Promise<BucketEntity | null> {
        const result = this.minioService.createBucket(id);

        if (!result) {
            return null;
        }

        return await this.bucketsRepository.createOne(id, users);
    }
}
