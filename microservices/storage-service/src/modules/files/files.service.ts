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
        const bucket = `users-${userId}`;

        await this.minioService.uploadFile(bucket, fileId, file);

        return await this.filesRepository.createOne(
            fileId,
            file.originalname,
            file.size,
            getFileExtension(file.originalname),
            bucket,
            userId,
        );
    }

    async download(bucket: string, id: string) {
        return await this.minioService.downloadFile(bucket, id);
    }

    async removeOne(bucket: string, id: string) {
        await this.minioService.removeFile(bucket, id);
        return await this.filesRepository.removeOneById(id);
    }

    async getOne(id: string) {
        return await this.filesRepository.findOneById(id);
    }

    async updateFileAccess(id: string, access: FileAccess) {
        return await this.filesRepository.updateOne(id, "access", access);
    }
}
