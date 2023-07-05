import { Inject } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";

import { UserEntity, UserEntityFKNames } from "@postgres/entities/user.entity";

import { UserUpdatedFieldsNames } from "@interfaces";

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

    async findOneById<T extends UserEntityFKNames = never>(
        id: number,
        relations: Record<T, boolean> = <Record<T, boolean>>{},
    ): Promise<Omit<UserEntity, Exclude<UserEntityFKNames, T>> | null> {
        return await this.repository.findOne({
            where: {
                id,
            },
            relations,
        });
    }

    async removeOneById(id: number) {
        return await this.repository
            .createQueryBuilder()
            .delete()
            .where("id = :id", { id })
            .execute();
    }

    async updateOneById<K extends UserUpdatedFieldsNames>(
        id: number,
        field: K,
        value: UserEntity[K],
    ) {
        return await this.repository
            .createQueryBuilder()
            .update()
            .set({
                [field]: value,
            })
            .where("id = :id", { id })
            .execute();
    }
}
