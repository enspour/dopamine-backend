import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { FilesService } from "@files/files.service";

import { UpdateFileAccessDto } from "./dto/update-file-access.dto";

@Controller()
export class StorageQueueController {
    constructor(private filesService: FilesService) {}

    @MessagePattern("storage.make.file.public")
    async makeFilePublic(@Payload() { fileId, userId }: UpdateFileAccessDto) {
        const file = await this.filesService.getOne(fileId);

        if (!file) {
            return {
                statusCode: 404,
            };
        }

        if (file.owner_id !== userId) {
            return {
                statusCode: 403,
            };
        }

        await this.filesService.updateAccess(fileId, "public");

        return {
            statusCode: 200,
            data: {
                fileId,
            },
        };
    }

    @MessagePattern("storage.make.file.private")
    async makeFilePrivate(@Payload() { fileId, userId }: UpdateFileAccessDto) {
        const file = await this.filesService.getOne(fileId);

        if (!file) {
            return {
                statusCode: 404,
            };
        }

        if (file.owner_id !== userId) {
            return {
                statusCode: 403,
            };
        }

        await this.filesService.updateAccess(fileId, "private");

        return {
            statusCode: 200,
            data: {
                fileId,
            },
        };
    }
}
