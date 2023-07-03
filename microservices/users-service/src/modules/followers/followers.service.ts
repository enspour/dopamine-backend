import { Injectable } from "@nestjs/common";

import { FollowingsRepository } from "@postgres/repositories/followings.repository";

@Injectable()
export class FollowersService {
    constructor(private followingsRepository: FollowingsRepository) {}

    async findAll(userId: number) {
        return await this.followingsRepository.findAllFollowers(userId, {
            follower: true,
        });
    }
}
