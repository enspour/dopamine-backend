import { Injectable } from "@nestjs/common";

import { MinioService } from "@minio/minio.service";

import { BucketsRepository } from "@mongodb/repositories/buckets.repository";

@Injectable()
export class BucketsService {
    constructor(
        private bucketsRepository: BucketsRepository,
        private minioService: MinioService,
    ) {}

    async getOne(id: string) {
        return await this.bucketsRepository.findOneById(id);
    }

    async createOne(id: string, users: number[]) {
        const result = this.minioService.createBucket(id);

        if (result) {
            return await this.bucketsRepository.createOne(id, users);
        }
    }
}
