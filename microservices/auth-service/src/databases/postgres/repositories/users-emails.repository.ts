import { Inject, Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";

import { UserEmailEntity } from "@postgres/entities/user-email.entity";
import { UserEntity } from "@postgres/entities/user.entity";

import constants from "@constants";

const { POSTGRES } = constants.injections;

@Injectable()
export class UsersEmailsRepository {
    private repository: Repository<UserEmailEntity>;

    constructor(@Inject(POSTGRES) private postgres: DataSource) {
        this.repository = postgres.getRepository(UserEmailEntity);
    }

    async findAll(userId: number) {
        return await this.repository.findBy({
            user: {
                id: userId,
            },
        });
    }

    async createOne(userId: number, email: string) {
        const owner = await this.postgres.manager.findOneBy(UserEntity, {
            id: userId,
        });

        const entity = new UserEmailEntity();
        entity.email = email;
        entity.confirm = false;
        entity.user = owner;

        const saved = await this.repository.save(entity);

        const { user, ...result } = saved;

        return result;
    }

    async removeOne(userId: number, emailId: number) {
        const { affected } = await this.repository
            .createQueryBuilder()
            .delete()
            .where("user.id = :userId", { userId })
            .where("id = :emailId", { emailId })
            .execute();

        return affected;
    }

    async updateConfirm(userId: number, emailId: number, value: boolean) {
        const { affected } = await this.repository
            .createQueryBuilder()
            .update()
            .set({
                confirm: value,
            })
            .where("user.id = :userId", { userId })
            .where("id = :emailId", { emailId })
            .execute();

        return affected;
    }
}
