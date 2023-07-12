import { Inject } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";

import {
    FollowingEntity,
    FollowingEntityFKNames,
} from "@postgres/entities/following.entity";

import constants from "@constants";

const { POSTGRES } = constants.injections;

export class FollowingsRepository {
    private repository: Repository<FollowingEntity>;

    constructor(@Inject(POSTGRES) postgres: DataSource) {
        this.repository = postgres.getRepository(FollowingEntity);
    }

    async findAllFollowers<T extends FollowingEntityFKNames = never>(
        userId: number,
        relations: Record<T, boolean> = <Record<T, boolean>>{},
    ): Promise<Omit<FollowingEntity, Exclude<FollowingEntityFKNames, T>>[]> {
        return await this.repository.find({
            where: {
                userId,
            },
            relations,
        });
    }

    async findAllFollowings<T extends FollowingEntityFKNames = never>(
        userId: number,
        relations: Record<T, boolean> = <Record<T, boolean>>{},
    ): Promise<Omit<FollowingEntity, Exclude<FollowingEntityFKNames, T>>[]> {
        return await this.repository.find({
            where: {
                followerId: userId,
            },
            relations,
        });
    }

    async createOne(userId: number, followerId: number) {
        const following = new FollowingEntity();
        following.userId = userId;
        following.followerId = followerId;

        return await this.repository.save(following);
    }

    async removeOne(userId: number, followerId: number) {
        const { affected } = await this.repository
            .createQueryBuilder()
            .delete()
            .where("userId = :userId", { userId })
            .where("followerId = :followerId", { followerId })
            .execute();

        return affected;
    }
}
