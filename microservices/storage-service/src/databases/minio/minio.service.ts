import { Inject, Injectable } from "@nestjs/common";
import * as minio from "minio";

import constants from "@constants";

const { MINIO } = constants.injections;

@Injectable()
export class MinioService {
    constructor(@Inject(MINIO) private client: minio.Client) {}

    async uploadFile(
        bucketName: string,
        fileId: string,
        fileBuffer: Buffer,
        fileSize: number,
    ) {
        return await this.client.putObject(
            bucketName,
            fileId,
            fileBuffer,
            fileSize,
        );
    }

    async downloadFile(bucket: string, fileId: string) {
        return await this.client.getObject(bucket, fileId);
    }

    async removeFile(bucket: string, fileId: string) {
        await this.client.removeObject(bucket, fileId);
    }

    async createBucket(bucket: string) {
        const isExists = await this.client.bucketExists(bucket);

        if (!isExists) {
            await this.client.makeBucket(bucket);
            return true;
        }

        return false;
    }
}
