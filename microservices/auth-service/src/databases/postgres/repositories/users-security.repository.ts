import { Inject, Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";

import { UserSecurityEntity } from "@postgres/entities/user-security.entity";

import constants from "@constants";

const { POSTGRES } = constants.injections;

@Injectable()
export class UsersSecurityRepository {
    private repository: Repository<UserSecurityEntity>;

    constructor(@Inject(POSTGRES) postgres: DataSource) {
        this.repository = postgres.getRepository(UserSecurityEntity);
    }

    async updateTFAByEmail(userId: number, value: boolean) {
        const { affected } = await this.repository
            .createQueryBuilder()
            .update()
            .set({
                TFAByEmail: value,
            })
            .where("user.id = :userId", { userId })
            .execute();

        return affected;
    }
}
