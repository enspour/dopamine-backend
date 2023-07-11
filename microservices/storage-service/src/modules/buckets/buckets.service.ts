import { Injectable } from "@nestjs/common";

import { MinioService } from "@minio/minio.service";

import { BucketsRepository } from "@mongodb/repositories/buckets.repository";

import { Bucket } from "@interfaces";

@Injectable()
export class BucketsService {
    constructor(
        private bucketsRepository: BucketsRepository,
        private minioService: MinioService,
    ) {}

    async getOne(name: string) {
        return await this.bucketsRepository.findOneByName(name);
    }

    async createOne(name: string, users: number[]): Promise<Bucket | null> {
        const result = this.minioService.createBucket(name);

        if (!result) {
            return null;
        }

        return await this.bucketsRepository.createOne(name, users);
    }
}
