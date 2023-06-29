import { Injectable } from "@nestjs/common";

import { FollowingsRepository } from "@postgres/repositories/followings.repository";

@Injectable()
export class FollowingsService {
    constructor(private followingsRepository: FollowingsRepository) {}

    async findAll(userId: number) {
        return await this.followingsRepository.findAllFollowings(userId, {
            user: true,
        });
    }

    async follow(userId: number, followerId: number) {
        return await this.followingsRepository.createOne(userId, followerId);
    }

    async unfollow(userId: number, followerId: number) {
        return await this.followingsRepository.removeOne(userId, followerId);
    }
}
