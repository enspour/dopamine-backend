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

    async uploadFile(file: Express.Multer.File, userId: number) {
        const fileId = new Types.ObjectId().toString();

        await this.minioService.uploadFile(fileId, file);

        const data = {
            _id: fileId,
            name: file.originalname,
            size: file.size,
            extension: getFileExtension(file.originalname),
            owner_id: userId,
        };

        return await this.filesRepository.createOne(data);
    }

    async downloadFile(id: string) {
        return await this.minioService.downloadFile(id);
    }

    async removeFile(id: string) {
        await this.minioService.removeFile(id);
        return await this.filesRepository.removeOneById(id);
    }

    async getFile(id: string) {
        return await this.filesRepository.findOneById(id);
    }

    async updateFileAccess(id: string, access: FileAccess) {
        return await this.filesRepository.updateOne(id, "access", access);
    }
}
