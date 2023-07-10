import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";

import { MinioService } from "@minio/minio.service";

import { FilesRepository } from "@mongodb/repositories/files.repository";

import { FileAccess } from "@interfaces";

import { getFileExtension } from "@utils";

@Injectable()
export class FilesService {
    constructor(
        private filesRepository: FilesRepository,
        private minioService: MinioService,
    ) {}

    async upload(file: Express.Multer.File, userId: number) {
        const fileId = new Types.ObjectId().toString();
        const fileName = file.originalname;
        const fileBuffer = file.buffer;
        const fileSize = file.size;
        const fileExtension = getFileExtension(file.originalname);

        const bucketName = `users-${userId}`;

        const result = await this.minioService.uploadFile(
            bucketName,
            fileId,
            fileBuffer,
            fileSize,
        );

        if (!result) {
            return null;
        }

        return await this.filesRepository.createOne(
            fileId,
            fileName,
            fileSize,
            fileExtension,
            bucketName,
            userId,
        );
    }

    async download(bucket: string, id: string) {
        return await this.minioService.downloadFile(bucket, id);
    }

    async getOne(id: string) {
        return await this.filesRepository.findOneById(id);
    }

    async removeOne(bucket: string, id: string) {
        await this.minioService.removeFile(bucket, id);

        const result = await this.filesRepository.removeOneById(id);

        if (result.deletedCount) {
            return true;
        }

        return false;
    }

    async updateAccess(id: string, access: FileAccess) {
        const result = await this.filesRepository.updateOne(
            id,
            "access",
            access,
        );

        if (result.modifiedCount) {
            return true;
        }

        return false;
    }
}
