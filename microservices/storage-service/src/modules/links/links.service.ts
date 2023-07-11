import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";

import { LinksRepository } from "@mongodb/repositories/links.repository";

@Injectable()
export class LinksService {
    constructor(private linksRepository: LinksRepository) {}

    async getOne(id: Types.ObjectId) {
        return await this.linksRepository.findOneById(id);
    }

    async createOne(fileId: Types.ObjectId) {
        return await this.linksRepository.createOne(fileId);
    }
}
