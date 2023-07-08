import { Inject, Injectable } from "@nestjs/common";
import * as minio from "minio";

import constants from "@constants";

import configs from "@configs";

const { MINIO } = constants.injections;

const { bucket } = configs.minio;

@Injectable()
export class MinioService {
    constructor(@Inject(MINIO) private client: minio.Client) {}

    async uploadFile(fileId: string, file: Express.Multer.File) {
        await this.client.putObject(bucket, fileId, file.buffer, file.size);
    }

    async downloadFile(fileId: string) {
        return await this.client.getObject(bucket, fileId);
    }

    async removeFile(fileId: string) {
        await this.client.removeObject(bucket, fileId);
    }
}
