import { Injectable } from "@nestjs/common";

import { LinksRepository } from "@mongodb/repositories/links.repository";

@Injectable()
export class LinksService {
    constructor(private linksRepository: LinksRepository) {}

    async getOne(id: string) {
        return await this.linksRepository.findOneById(id);
    }

    async createOne(fileId: string) {
        return await this.linksRepository.createOne(fileId);
    }
}
