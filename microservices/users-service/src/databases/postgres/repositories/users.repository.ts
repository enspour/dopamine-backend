import { Inject } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";

import {
    UserEntity,
    UserEntityRelationsFields,
    UserEntityUpdatedFields,
} from "@postgres/entities/user.entity";

import constants from "@constants";

const { POSTGRES } = constants.injections;

export class UsersRepository {
    private repository: Repository<UserEntity>;

    constructor(@Inject(POSTGRES) postgres: DataSource) {
        this.repository = postgres.getRepository(UserEntity);
    }

    async createOne(id: number, nickname: string) {
        const user = new UserEntity();
        user.id = id;
        user.nickname = nickname;
        user.name = id.toString();
        user.avatar = "";
        user.status = "";

        await this.repository.save(user);

        const { followers, followings, ...result } = user;

        return result;
    }

    async findOneById<T extends UserEntityRelationsFields = never>(
        id: number,
        relations: Record<T, boolean> = <Record<T, boolean>>{},
    ): Promise<Omit<UserEntity, Exclude<UserEntityRelationsFields, T>> | null> {
        return await this.repository.findOne({
            where: {
                id,
            },
            relations,
        });
    }

    async removeOneById(id: number) {
        const { affected } = await this.repository
            .createQueryBuilder()
            .delete()
            .where("id = :id", { id })
            .execute();

        return affected;
    }

    async updateOneById<K extends UserEntityUpdatedFields>(
        id: number,
        field: K,
        value: UserEntity[K],
    ) {
        const { affected } = await this.repository
            .createQueryBuilder()
            .update()
            .set({
                [field]: value,
            })
            .where("id = :id", { id })
            .execute();

        return affected;
    }
}
