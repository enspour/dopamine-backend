import { Injectable } from "@nestjs/common";

import { LinksRepository } from "@mongodb/repositories/links.repository";

@Injectable()
export class LinksService {
    constructor(private linksRepository: LinksRepository) {}

    async createLink(fileId: string) {
        return await this.linksRepository.createOne(fileId);
    }

    async getLink(link: string) {
        return await this.linksRepository.findOneById(link);
    }
}
