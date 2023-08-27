import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";

import { MinioService } from "@minio/minio.service";

import { FileMetadataRepository } from "@mongodb/repositories/file-metadata.repository";

import { FileAccess } from "@interfaces";

import { getFileExtension } from "@utils";

@Injectable()
export class FilesService {
    constructor(
        private filesRepository: FileMetadataRepository,
        private minioService: MinioService,
    ) {}

    async getOne(id: Types.ObjectId) {
        return await this.filesRepository.findOneById(id);
    }

    async upload(file: Express.Multer.File, userId: number) {
        const fileId = new Types.ObjectId();
        const fileName = file.originalname;
        const fileBuffer = file.buffer;
        const fileSize = file.size;
        const fileExtension = getFileExtension(file.originalname);

        const bucket = `users-${userId}`;

        const result = await this.minioService.uploadFile(
            bucket,
            fileId.toString(),
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
            bucket,
            userId,
        );
    }

    async download(id: Types.ObjectId, bucket: string) {
        return await this.minioService.downloadFile(bucket, id.toString());
    }

    async removeOne(id: Types.ObjectId, bucket: string) {
        await this.minioService.removeFile(bucket, id.toString());
        return await this.filesRepository.removeOneById(id);
    }

    async updateAccess(id: Types.ObjectId, access: FileAccess) {
        return await this.filesRepository.updateOne(id, "access", access);
    }
}
