import { Inject, Injectable } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

import constants from "@constants";

import { UpdateFileAccessDto } from "./dto/update-file-access.dto";

const { STORAGE_QUEUE } = constants.injections;

@Injectable()
export class StorageQueueService {
    constructor(@Inject(STORAGE_QUEUE) private queue: ClientKafka) {}

    async makeFilePublic(fileId: string, userId: number) {
        const data: UpdateFileAccessDto = {
            fileId,
            userId,
        };

        const payload = JSON.stringify(data);

        const observable = this.queue.send("storage.make.file.public", payload);

        return await firstValueFrom(observable);
    }
}
