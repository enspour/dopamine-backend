import { Inject } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";

import {
    FollowingEntity,
    FollowingEntityRelationsFields,
} from "@postgres/entities/following.entity";

import constants from "@constants";

const { POSTGRES } = constants.injections;

export class FollowingsRepository {
    private repository: Repository<FollowingEntity>;

    constructor(@Inject(POSTGRES) postgres: DataSource) {
        this.repository = postgres.getRepository(FollowingEntity);
    }

    async findAllFollowers<T extends FollowingEntityRelationsFields = never>(
        user_id: number,
        relations: Record<T, boolean> = <Record<T, boolean>>{},
    ): Promise<
        Omit<FollowingEntity, Exclude<FollowingEntityRelationsFields, T>>[]
    > {
        return await this.repository.find({
            where: {
                user_id,
            },
            relations,
        });
    }

    async findAllFollowings<T extends FollowingEntityRelationsFields = never>(
        user_id: number,
        relations: Record<T, boolean> = <Record<T, boolean>>{},
    ): Promise<
        Omit<FollowingEntity, Exclude<FollowingEntityRelationsFields, T>>[]
    > {
        return await this.repository.find({
            where: {
                follower_id: user_id,
            },
            relations,
        });
    }

    async createOne(user_id: number, follower_id: number) {
        const following = new FollowingEntity();
        following.user_id = user_id;
        following.follower_id = follower_id;

        return await this.repository.save(following);
    }

    async removeOne(user_id: number, follower_id: number) {
        const { affected } = await this.repository
            .createQueryBuilder()
            .delete()
            .where("user_id = :user_id", { user_id })
            .where("follower_id = :follower_id", { follower_id })
            .execute();

        return affected;
    }
}
